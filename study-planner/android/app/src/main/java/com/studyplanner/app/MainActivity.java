package com.studyplanner.app;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AlertDialog;
import com.getcapacitor.BridgeActivity;
import androidx.core.splashscreen.SplashScreen;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // 1. Install Android 12 Splash Screen
        SplashScreen.installSplashScreen(this);
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
            
            // Fix White/Black flash by setting background
            webView.setBackgroundColor(android.graphics.Color.WHITE);
            
            // NOTE: We REMOVED the manual setWebViewClient override.
            // Overriding the client breaks the Capacitor Bridge and prevents plugins 
            // from communicating (like SplashScreen.hide()).
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
