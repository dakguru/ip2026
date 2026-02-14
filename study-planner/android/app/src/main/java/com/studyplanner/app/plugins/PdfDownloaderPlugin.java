package com.studyplanner.app.plugins;

import android.Manifest;
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

    @PluginMethod
    public void downloadPdf(PluginCall call) {
        // On Android 9 and below, we NEED storage permission
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
            if (getPermissionState("storage") != PermissionState.GRANTED) {
                requestPermissionForAlias("storage", call, "storagePermissionCallback");
                return;
            }
        }

        // On Android 13+, try to request notification permission (for download progress notification)
        // But don't block the download if denied — notifications are optional
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (getPermissionState("notifications") != PermissionState.GRANTED) {
                // Request notification permission, but start download regardless
                try {
                    requestPermissionForAlias("notifications", call, "notificationPermissionCallback");
                } catch (Exception e) {
                    // If permission request fails (e.g., already denied permanently), just download
                    startDownload(call);
                }
                return;
            }
        }

        // All good — start download directly
        startDownload(call);
    }

    @PermissionCallback
    private void storagePermissionCallback(PluginCall call) {
        if (getPermissionState("storage") == PermissionState.GRANTED) {
            startDownload(call);
        } else {
            call.reject("Storage permission is required to download PDFs.");
        }
    }

    @PermissionCallback
    private void notificationPermissionCallback(PluginCall call) {
        // Start download regardless of notification permission result
        // Notifications are optional — the download still works without them
        startDownload(call);
    }

    private void startDownload(PluginCall call) {
        String url = call.getString("url");
        if (url == null || url.isEmpty()) {
            call.reject("URL is required");
            return;
        }

        try {
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
            
            String filename = URLUtil.guessFileName(url, null, "application/pdf");
            if (!filename.toLowerCase().endsWith(".pdf")) {
                filename += ".pdf";
            }

            request.setMimeType("application/pdf");
            String cookies = CookieManager.getInstance().getCookie(url);
            request.addRequestHeader("cookie", cookies);
            request.addRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36");
            
            request.setDescription("Downloading file...");
            request.setTitle(filename);
            request.allowScanningByMediaScanner();
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            
            // Scope storage handling
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, filename);
            
            DownloadManager dm = (DownloadManager) getContext().getSystemService(Context.DOWNLOAD_SERVICE);
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
