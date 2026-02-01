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
        

        // Removed artificial delay to comply with "Strictly No Splash Screen" request.
        // We defer splash dismissal control to the Capacitor Plugin (via JS code) or default behavior.

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
            // This ensures no blinding white screen appears during transition.
            webView.setBackgroundColor(android.graphics.Color.parseColor("#0f172a"));

            // Hack: Remove "wv" from UserAgent to make 3rd party libs (Razorpay/Google) 
            // think this is a real browser (Chrome) and enable features like UPI Intent.
            String newUserAgent = settings.getUserAgentString().replace("; wv", "");
            settings.setUserAgentString(newUserAgent);
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
