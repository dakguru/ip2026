package com.studyplanner.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.ActivityNotFoundException;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.URLUtil;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import androidx.core.splashscreen.SplashScreen;

import com.getcapacitor.BridgeActivity;

import java.io.File;

public class MainActivity extends BridgeActivity {

    private String pendingDownloadUrl = null;
    private String pendingMimeType = null;
    private String pendingContentDisposition = null;
    private ProgressDialog progressDialog;
    private long downloadId = -1;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private Runnable progressRunnable;

    // Permission Launcher
    private final ActivityResultLauncher<String[]> requestPermissionLauncher =
            registerForActivityResult(new ActivityResultContracts.RequestMultiplePermissions(), result -> {
                boolean allGranted = true;
                for (Boolean granted : result.values()) {
                    if (!granted) {
                        allGranted = false;
                        break;
                    }
                }

                if (allGranted) {
                    if (pendingDownloadUrl != null) {
                        startDownload(pendingDownloadUrl, pendingMimeType, pendingContentDisposition);
                    }
                } else {
                    Toast.makeText(this, "Permissions denied. Cannot download file.", Toast.LENGTH_LONG).show();
                }
            });

    // Expose a JS interface for the Web App to trigger downloads
    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context context) {
            mContext = context;
        }

        @JavascriptInterface
        public void downloadPdf(String url) {
             // Run on UI thread to handle UI and permissions
             runOnUiThread(() -> {
                 checkPermissionsAndDownload(url, "application/pdf", null);
             });
        }
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // 1. Install Android 12 Splash Screen
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);

        final boolean[] isReady = {false};
        splashScreen.setKeepOnScreenCondition(() -> !isReady[0]);

        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            isReady[0] = true;
        }, 2000);

        super.onCreate(savedInstanceState);

        // 2. Optimization: Enhance WebView Performance
        WebView webView = bridge.getWebView();
        if (webView != null) {
            WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setDatabaseEnabled(true);
            
            // Disable Zoom functionality for native feel
            settings.setBuiltInZoomControls(false);
            settings.setDisplayZoomControls(false);
            settings.setSupportZoom(false);
            
            // Fix White Flash
            webView.setBackgroundColor(android.graphics.Color.parseColor("#0f172a"));

            // Hack: Remove "wv" from UserAgent
            String newUserAgent = settings.getUserAgentString().replace("; wv", "");
            settings.setUserAgentString(newUserAgent);

            // Register JS Interface
            webView.addJavascriptInterface(new WebAppInterface(this), "AndroidNative");

            // --- PDF DOWNLOAD SUPPORT ---
            webView.setDownloadListener((url, userAgent, contentDisposition, mimetype, contentLength) -> {
                pendingDownloadUrl = url;
                pendingMimeType = mimetype;
                pendingContentDisposition = contentDisposition;
                checkPermissionsAndDownload(url, mimetype, contentDisposition);
            });
        }
        
        // Register Download Complete Receiver
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(onDownloadComplete, 
                new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE),
                Context.RECEIVER_EXPORTED);
        } else {
            registerReceiver(onDownloadComplete, 
                new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
        }

        // 3. Centralized back button handling
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WebView webView = bridge.getWebView();
                if (webView != null && webView.canGoBack()) {
                    webView.goBack();
                } else {
                    showExitConfirmationDialog();
                }
            }
        });

        // Request permissions on first launch if needed
        checkPermissionsOnLaunch();
    }

    private void checkPermissionsOnLaunch() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                 showPermissionRationaleDialog(() -> {
                     requestPermissionLauncher.launch(new String[]{Manifest.permission.POST_NOTIFICATIONS});
                 });
            }
        } else if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) {
             if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                 showPermissionRationaleDialog(() -> {
                     requestPermissionLauncher.launch(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE});
                 });
            }
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        try {
            unregisterReceiver(onDownloadComplete);
            handler.removeCallbacks(progressRunnable);
        } catch (Exception e) {
            Log.e("MainActivity", "Error cleanup", e);
        }
    }

    private void checkPermissionsAndDownload(String url, String mimetype, String contentDisposition) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) { // Android 13+
             if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
                 startDownload(url, mimetype, contentDisposition);
             } else {
                showPermissionRationaleDialog(() -> {
                    requestPermissionLauncher.launch(new String[]{
                        Manifest.permission.POST_NOTIFICATIONS
                    });
                });
             }
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) { // Android 10-12
             // No storage permission needed for DownloadManager public/scoped directories
             startDownload(url, mimetype, contentDisposition);
        } else { // Android 9 and below
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
                startDownload(url, mimetype, contentDisposition);
            } else {
                showPermissionRationaleDialog(() -> {
                    requestPermissionLauncher.launch(new String[]{
                        Manifest.permission.READ_EXTERNAL_STORAGE,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE
                    });
                });
            }
        }
    }

    private void showPermissionRationaleDialog(Runnable onConfirm) {
        new AlertDialog.Builder(this)
            .setTitle("Permission Required")
            .setMessage("Storage & notification permission are required to download study PDFs.")
            .setPositiveButton("Grant", (dialog, which) -> onConfirm.run())
            .setNegativeButton("Cancel", (dialog, which) -> dialog.dismiss())
            .setCancelable(false)
            .show();
    }

    private void startDownload(String url, String mimetype, String contentDisposition) {
        try {
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
            
            String filename = URLUtil.guessFileName(url, contentDisposition, mimetype);
            if (!filename.toLowerCase().endsWith(".pdf")) {
                filename += ".pdf"; 
            }

            request.setMimeType("application/pdf");
            String cookies = CookieManager.getInstance().getCookie(url);
            request.addRequestHeader("cookie", cookies);
            request.addRequestHeader("User-Agent", WebSettings.getDefaultUserAgent(this));
            
            request.setDescription("Downloading file...");
            request.setTitle(filename);
            request.allowScanningByMediaScanner();
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            
            // Scope storage handling
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                 // Android 11+ Scoped Storage - Use Public Downloads which is allowed
                 request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, filename);
            } else {
                 request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, filename);
            }
            
            DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            downloadId = dm.enqueue(request);

            showProgressDialog(filename);
            startProgressTracker();
            
        } catch (Exception e) {
            Log.e("DownloadManager", "Error starting download", e);
            Toast.makeText(this, "Download failed: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

    private void showProgressDialog(String filename) {
        progressDialog = new ProgressDialog(this);
        progressDialog.setTitle("Downloading PDF");
        progressDialog.setMessage("Downloading " + filename + "...");
        progressDialog.setIndeterminate(false);
        progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        progressDialog.setCancelable(false);
        progressDialog.show();
    }

    private void startProgressTracker() {
        progressRunnable = new Runnable() {
            @Override
            public void run() {
                checkDownloadProgress();
                if (progressDialog != null && progressDialog.isShowing()) {
                    handler.postDelayed(this, 500);
                }
            }
        };
        handler.post(progressRunnable);
    }

    @SuppressLint("Range")
    private void checkDownloadProgress() {
        DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(downloadId);
        Cursor cursor = dm.query(query);

        if (cursor != null && cursor.moveToFirst()) {
            int bytesDownloaded = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
            int bytesTotal = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
            
            if (cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS)) == DownloadManager.STATUS_SUCCESSFUL) {
                progressDialog.dismiss();
            } else if (bytesTotal > 0) {
                int progress = (int) ((bytesDownloaded * 100l) / bytesTotal);
                progressDialog.setProgress(progress);
            }
            cursor.close();
        }
    }

    private final BroadcastReceiver onDownloadComplete = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (downloadId == id) {
                if (progressDialog != null && progressDialog.isShowing()) {
                    progressDialog.dismiss();
                }
                
                openDownloadedFile(id);
            }
        }
    };

    private void openDownloadedFile(long id) {
        try {
            DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            DownloadManager.Query query = new DownloadManager.Query();
            query.setFilterById(id);
            Cursor cursor = dm.query(query);
            
            if (cursor.moveToFirst()) {
                @SuppressLint("Range") int status = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    @SuppressLint("Range") String uriString = cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_URI));
                     if (uriString != null) {
                        Uri uri = Uri.parse(uriString);
                        Intent intent = new Intent(Intent.ACTION_VIEW);
                        
                        Uri contentUri;
                        if ("file".equals(uri.getScheme())) {
                            contentUri = FileProvider.getUriForFile(this, getApplicationContext().getPackageName() + ".fileprovider", new File(uri.getPath()));
                        } else {
                             contentUri = uri;
                        }
                        
                        intent.setDataAndType(contentUri, "application/pdf");
                        intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                        startActivity(intent);
                        Toast.makeText(this, "Download Complete", Toast.LENGTH_SHORT).show();
                     }
                } else {
                     Toast.makeText(this, "Download Failed", Toast.LENGTH_SHORT).show();
                }
            }
            cursor.close();
        } catch (ActivityNotFoundException e) {
            Toast.makeText(this, "No PDF reader found. Please install one.", Toast.LENGTH_LONG).show();
            // Optional: Redirect to Play Store
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=com.google.android.apps.pdfviewer")));
            } catch (Exception ex) {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=com.google.android.apps.pdfviewer")));
            }
        } catch (Exception e) {
            Log.e("DownloadManager", "Error opening file", e);
            Toast.makeText(this, "Error opening file: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void showExitConfirmationDialog() {
        new AlertDialog.Builder(this)
            .setTitle("Exit App?")
            .setMessage("Do you want to close the application?")
            .setPositiveButton("Yes", (dialog, which) -> {
                finishAffinity();
            })
            .setNegativeButton("No", (dialog, which) -> {
                dialog.dismiss();
            })
            .setCancelable(false)
            .show();
    }
}
