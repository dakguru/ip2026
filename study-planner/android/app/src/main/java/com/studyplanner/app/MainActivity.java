package com.studyplanner.app;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.JavascriptInterface;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AlertDialog;
import com.getcapacitor.BridgeActivity;
import androidx.core.splashscreen.SplashScreen;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // 1. Install Android 12 Splash Screen
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);

        // Fix "Black Void": Keep native splash visible until app is ready
        // We use a safe delay of 2000ms to allow Capacitor/JS to load
        final boolean[] isReady = {false};
        splashScreen.setKeepOnScreenCondition(() -> !isReady[0]);

        new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
            isReady[0] = true;
        }, 2000);

        super.onCreate(savedInstanceState);

        // 2. Optimization: Enhance WebView Performance
        WebView webView = bridge.getWebView();
        if (webView != null) {
            android.webkit.WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setDatabaseEnabled(true);
            
            // Disable Zoom functionality for native feel
            settings.setBuiltInZoomControls(false);
            settings.setDisplayZoomControls(false);
            settings.setSupportZoom(false);
            
            // Fix White Flash: Set background to Dark Brand Color (#0f172a)
            webView.setBackgroundColor(android.graphics.Color.parseColor("#0f172a"));

            // Hack: Remove "wv" from UserAgent
            String newUserAgent = settings.getUserAgentString().replace("; wv", "");
            settings.setUserAgentString(newUserAgent);

            // --- PDF DOWNLOAD SUPPORT ---
            webView.setDownloadListener((url, userAgent, contentDisposition, mimetype, contentLength) -> {
                checkPermissionsAndDownload(url, mimetype, contentDisposition);
            });
        }
        
        // Register Download Complete Receiver
        registerReceiver(onDownloadComplete, new android.content.IntentFilter(android.app.DownloadManager.ACTION_DOWNLOAD_COMPLETE));

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
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        try {
            unregisterReceiver(onDownloadComplete);
        } catch (Exception e) {
            Log.e("MainActivity", "Error unregistering receiver", e);
        }
    }

    // --- PERMISSION & DOWNLOAD LOGIC ---

    private String pendingDownloadUrl = null;
    private String pendingMimeType = null;
    private String pendingContentDisposition = null;

    // Permission Launcher
    private final androidx.activity.result.ActivityResultLauncher<String[]> requestPermissionLauncher =
            registerForActivityResult(new androidx.activity.result.contract.ActivityResultContracts.RequestMultiplePermissions(), result -> {
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
                    android.widget.Toast.makeText(this, "Permissions denied. Cannot download file.", android.widget.Toast.LENGTH_LONG).show();
                }
            });

    private void checkPermissionsAndDownload(String url, String mimetype, String contentDisposition) {
        pendingDownloadUrl = url;
        pendingMimeType = mimetype;
        pendingContentDisposition = contentDisposition;

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) { // Android 13+
            // Request Notification permission + READ_MEDIA_DOCUMENTS
             requestPermissionLauncher.launch(new String[]{
                android.Manifest.permission.POST_NOTIFICATIONS,
                "android.permission.READ_MEDIA_DOCUMENTS" 
            });
        } else { // Android 12 and below
            if (androidx.core.content.ContextCompat.checkSelfPermission(this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                startDownload(url, mimetype, contentDisposition);
            } else {
                requestPermissionLauncher.launch(new String[]{
                    android.Manifest.permission.READ_EXTERNAL_STORAGE,
                    android.Manifest.permission.WRITE_EXTERNAL_STORAGE
                });
            }
        }
    }

    private void startDownload(String url, String mimetype, String contentDisposition) {
        try {
            android.app.DownloadManager.Request request = new android.app.DownloadManager.Request(android.net.Uri.parse(url));
            
            // Parse filename
            String filename = android.webkit.URLUtil.guessFileName(url, contentDisposition, mimetype);
            if (!filename.toLowerCase().endsWith(".pdf")) {
                filename += ".pdf"; // Ensure PDF extension if missing
            }

            request.setMimeType("application/pdf");
            String cookies = android.webkit.CookieManager.getInstance().getCookie(url);
            request.addRequestHeader("cookie", cookies);
            request.addRequestHeader("User-Agent", android.webkit.WebSettings.getDefaultUserAgent(this));
            
            request.setDescription("Downloading file...");
            request.setTitle(filename);
            request.allowScanningByMediaScanner();
            request.setNotificationVisibility(android.app.DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            
            request.setDestinationInExternalPublicDir(android.os.Environment.DIRECTORY_DOWNLOADS, filename);
            
            android.app.DownloadManager dm = (android.app.DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            dm.enqueue(request);
            
            android.widget.Toast.makeText(this, "Downloading PDF...", android.widget.Toast.LENGTH_SHORT).show();
            
        } catch (Exception e) {
            Log.e("DownloadManager", "Error starting download", e);
            android.widget.Toast.makeText(this, "Download failed: " + e.getMessage(), android.widget.Toast.LENGTH_LONG).show();
        }
    }

    // --- AUTO OPEN LOGIC ---
    private final android.content.BroadcastReceiver onDownloadComplete = new android.content.BroadcastReceiver() {
        @Override
        public void onReceive(android.content.Context context, android.content.Intent intent) {
            long id = intent.getLongExtra(android.app.DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (id != -1) {
                try {
                    android.app.DownloadManager dm = (android.app.DownloadManager) getSystemService(DOWNLOAD_SERVICE);
                    android.app.DownloadManager.Query query = new android.app.DownloadManager.Query();
                    query.setFilterById(id);
                    android.database.Cursor cursor = dm.query(query);
                    
                    if (cursor.moveToFirst()) {
                        int statusIndex = cursor.getColumnIndex(android.app.DownloadManager.COLUMN_STATUS);
                        if (android.app.DownloadManager.STATUS_SUCCESSFUL == cursor.getInt(statusIndex)) {
                            int uriIndex = cursor.getColumnIndex(android.app.DownloadManager.COLUMN_LOCAL_URI);
                            String uriString = cursor.getString(uriIndex);
                            
                            if (uriString != null) {
                                openDownloadedFile(android.net.Uri.parse(uriString));
                            }
                        }
                    }
                    cursor.close();
                } catch (Exception e) {
                    Log.e("DownloadManager", "Error in receiver", e);
                }
            }
        }
    };

    private void openDownloadedFile(android.net.Uri fileUri) {
        try {
            android.content.Intent intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
            
            // Convert file:// URI to content:// URI using FileProvider if necessary
            android.net.Uri contentUri;
            if ("file".equals(fileUri.getScheme())) {
                java.io.File file = new java.io.File(fileUri.getPath());
                 contentUri = androidx.core.content.FileProvider.getUriForFile(
                        this,
                        getApplicationContext().getPackageName() + ".fileprovider",
                        file
                );
            } else {
                contentUri = fileUri;
            }

            intent.setDataAndType(contentUri, "application/pdf");
            intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NO_HISTORY);
            intent.addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);
            
            startActivity(intent);
            android.widget.Toast.makeText(this, "PDF Saved to Downloads", android.widget.Toast.LENGTH_LONG).show();
            
        } catch (android.content.ActivityNotFoundException e) {
            android.widget.Toast.makeText(this, "No PDF viewer found. Please install one.", android.widget.Toast.LENGTH_LONG).show();
            // Redirect to Play Store preferably? Or just toast.
        } catch (Exception e) {
            Log.e("DownloadManager", "Error opening file", e);
            android.widget.Toast.makeText(this, "Error opening file: " + e.getMessage(), android.widget.Toast.LENGTH_SHORT).show();
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
