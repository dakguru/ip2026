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
        // 1. Install Android 12 Splash Screen with custom Exit Animation
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);

        // Keep Splash Screen visible for a fixed duration to cover WebView initialization
        final boolean[] keepSplashScreen = {true};
        new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(() -> {
            keepSplashScreen[0] = false;
        }, 1500); // 1.5 seconds delay

        splashScreen.setKeepOnScreenCondition(() -> keepSplashScreen[0]);

        splashScreen.setOnExitAnimationListener(splashScreenView -> {
            final android.view.View view = splashScreenView.getView();
            final android.view.View iconView = splashScreenView.getIconView();

            // Fade out the entire splash view
            android.animation.ObjectAnimator fade = android.animation.ObjectAnimator.ofFloat(view, android.view.View.ALPHA, 1f, 0f);
            fade.setInterpolator(new android.view.animation.AccelerateInterpolator());
            fade.setDuration(400L);

            // Scale down the icon slightly
            android.animation.ObjectAnimator scaleX = android.animation.ObjectAnimator.ofFloat(iconView, android.view.View.SCALE_X, 1f, 0.8f);
            android.animation.ObjectAnimator scaleY = android.animation.ObjectAnimator.ofFloat(iconView, android.view.View.SCALE_Y, 1f, 0.8f);
            scaleX.setDuration(400L);
            scaleY.setDuration(400L);

            android.animation.AnimatorSet set = new android.animation.AnimatorSet();
            set.playTogether(fade, scaleX, scaleY);
            set.addListener(new android.animation.AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(android.animation.Animator animation) {
                    splashScreenView.remove();
                }
            });
            set.start();
        });
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

            // Hack: Remove "wv" from UserAgent to make 3rd party libs (Razorpay/Google) 
            // think this is a real browser (Chrome) and enable features like UPI Intent.
            String newUserAgent = settings.getUserAgentString().replace("; wv", "");
            settings.setUserAgentString(newUserAgent);
            
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
