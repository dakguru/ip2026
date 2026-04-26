package com.studyplanner.app.plugins;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ActivityNotFoundException;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.MimeTypeMap;
import android.webkit.URLUtil;

import androidx.core.app.NotificationCompat;
import androidx.core.content.FileProvider;

import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import java.io.File;
import java.util.Timer;
import java.util.TimerTask;

@CapacitorPlugin(
    name = "PdfDownloader",
    permissions = {
        @Permission(
            alias = "storage",
            strings = { Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE }
        ),
        @Permission(
            alias = "notifications",
            strings = { Manifest.permission.POST_NOTIFICATIONS }
        )
    }
)
public class PdfDownloaderPlugin extends Plugin {

    private long downloadId = -1;
    private Timer progressTimer;

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void downloadPdf(PluginCall call) {
        // Keep the call alive so progress events can be sent after permissions are resolved
        call.setKeepAlive(true);

        // On Android 9 and below, we NEED storage permission
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            if (getPermissionState("storage") != PermissionState.GRANTED) {
                // Save the call before going async — Capacitor frees it otherwise
                saveCall(call);
                requestPermissionForAlias("storage", call, "storagePermissionCallback");
                return;
            }
        }

        // On Android 10+, no storage permission is needed for DownloadManager.
        // Notification permission is NOT required for the download itself — if the
        // permission is missing, the system notification is silently skipped but the
        // download still completes. We intentionally skip requesting it here to avoid
        // blocking/hanging the download when the permission is permanently denied.
        startDownload(call);
    }

    @PermissionCallback
    private void storagePermissionCallback(PluginCall call) {
        // Retrieve the saved call in case it was freed
        PluginCall savedCall = getSavedCall();
        PluginCall activeCall = (savedCall != null) ? savedCall : call;
        if (getPermissionState("storage") == PermissionState.GRANTED) {
            startDownload(activeCall);
        } else {
            activeCall.reject("Storage permission is required to download PDFs.");
        }
    }

    private void startDownload(PluginCall call) {
        String url = call.getString("url");
        if (url == null || url.isEmpty()) {
            call.reject("URL is required");
            return;
        }

        // Convert relative URLs to absolute — DownloadManager needs full https:// URLs
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            // URL-encode the path segments (handle spaces, commas, etc.)
            String[] segments = url.split("/");
            StringBuilder encodedPath = new StringBuilder();
            for (String segment : segments) {
                if (!segment.isEmpty()) {
                    encodedPath.append("/");
                    try {
                        encodedPath.append(java.net.URLEncoder.encode(segment, "UTF-8").replace("+", "%20"));
                    } catch (Exception e) {
                        encodedPath.append(segment);
                    }
                }
            }
            url = "https://dakguru.com" + encodedPath.toString();
        }

        try {
            DownloadManager dm = (DownloadManager) getContext().getSystemService(Context.DOWNLOAD_SERVICE);
            if (dm == null) {
                call.reject("DownloadManager is not available on this device. Please enable it in Settings > Apps.");
                return;
            }

            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));

            // Use the explicit filename from JS if provided, otherwise guess from URL
            String filename = call.getString("filename");
            if (filename == null || filename.isEmpty()) {
                filename = URLUtil.guessFileName(url, null, "application/pdf");
            }
            if (!filename.toLowerCase().endsWith(".pdf")) {
                filename += ".pdf";
            }

            request.setMimeType("application/pdf");
            // Flush to make sure WebView cookies are synced before reading
            CookieManager.getInstance().flush();
            String cookies = CookieManager.getInstance().getCookie(url);
            if (cookies != null && !cookies.isEmpty()) {
                request.addRequestHeader("cookie", cookies);
            }
            request.addRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36");

            request.setDescription("Downloading file...");
            request.setTitle(filename);
            request.allowScanningByMediaScanner();

            // On Android 13+, only show the download notification if permission is granted.
            // Without this check, VISIBILITY_VISIBLE_NOTIFY_COMPLETED can silently fail the
            // download on some Android 13+ ROMs when POST_NOTIFICATIONS is denied.
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                    getPermissionState("notifications") != PermissionState.GRANTED) {
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_HIDDEN);
            } else {
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            }

            // Scope storage handling
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, filename);

            downloadId = dm.enqueue(request);

            // Register Receiver for Auto-Open
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                getContext().registerReceiver(onDownloadComplete, 
                    new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE),
                    Context.RECEIVER_EXPORTED);
            } else {
                getContext().registerReceiver(onDownloadComplete, 
                    new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
            }

            // Start Progress Tracking
            startProgressTracker(call);
            
            call.resolve(); // Resolves immediate call, progress events sent separately

        } catch (Exception e) {
            Log.e("PdfDownloader", "Error starting download", e);
            call.reject("Download failed: " + e.getMessage());
        }
    }

    private void startProgressTracker(PluginCall call) {
        if (progressTimer != null) {
            progressTimer.cancel();
        }
        progressTimer = new Timer();
        progressTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                checkDownloadProgress();
            }
        }, 0, 500);
    }

    @SuppressLint("Range")
    private void checkDownloadProgress() {
        DownloadManager dm = (DownloadManager) getContext().getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(downloadId);
        Cursor cursor = dm.query(query);

        if (cursor != null && cursor.moveToFirst()) {
            int bytesDownloaded = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
            int bytesTotal = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
            int status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));

            JSObject data = new JSObject();
            
            if (status == DownloadManager.STATUS_SUCCESSFUL) {
                data.put("status", "completed");
                data.put("progress", 100);
                notifyListeners("downloadProgress", data);
                if (progressTimer != null) progressTimer.cancel();
            } else if (status == DownloadManager.STATUS_FAILED) {
                data.put("status", "failed");
                notifyListeners("downloadProgress", data);
                if (progressTimer != null) progressTimer.cancel();
            } else {
                int progress = 0;
                 if (bytesTotal > 0) {
                    progress = (int) ((bytesDownloaded * 100l) / bytesTotal);
                }
                data.put("status", "downloading");
                data.put("progress", progress);
                notifyListeners("downloadProgress", data);
            }
            cursor.close();
        } else {
            if (progressTimer != null) progressTimer.cancel();
        }
    }

    private final BroadcastReceiver onDownloadComplete = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (downloadId == id) {
                openDownloadedFile(id);
                try {
                    context.unregisterReceiver(this);
                } catch (Exception e) {
                    // Ignore
                }
            }
        }
    };

    @SuppressLint("Range")
    private void openDownloadedFile(long id) {
         try {
            DownloadManager dm = (DownloadManager) getContext().getSystemService(Context.DOWNLOAD_SERVICE);
            DownloadManager.Query query = new DownloadManager.Query();
            query.setFilterById(id);
            Cursor cursor = dm.query(query);
            
            if (cursor.moveToFirst()) {
                int status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    String uriString = cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_URI));
                     if (uriString != null) {
                        Uri uri = Uri.parse(uriString);
                        Intent intent = new Intent(Intent.ACTION_VIEW);
                        
                        Uri contentUri;
                        if ("file".equals(uri.getScheme())) {
                             File file = new File(uri.getPath());
                             contentUri = FileProvider.getUriForFile(
                                    getContext(),
                                    getContext().getPackageName() + ".fileprovider",
                                    file
                            );
                        } else {
                             contentUri = uri;
                        }
                        
                        intent.setDataAndType(contentUri, "application/pdf");
                        intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY | Intent.FLAG_ACTIVITY_NEW_TASK);
                        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                        getContext().startActivity(intent);
                     }
                }
            }
            cursor.close();
        } catch (ActivityNotFoundException e) {
             // Handle no PDF viewer
        } catch (Exception e) {
            Log.e("PdfDownloader", "Error opening file", e);
        }
    }
}
