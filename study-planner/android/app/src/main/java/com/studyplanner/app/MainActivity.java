package com.studyplanner.app;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.core.view.GravityCompat;
import com.google.android.material.navigation.NavigationView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Native UI Initialization
        Toolbar toolbar = findViewById(R.id.toolbar);
        if (toolbar != null) {
            setSupportActionBar(toolbar);
        }

        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        NavigationView navigationView = findViewById(R.id.nav_view);

        if (drawer != null && toolbar != null) {
            ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                    this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
            drawer.addDrawerListener(toggle);
            toggle.syncState();
        }

        if (navigationView != null) {
            navigationView.setNavigationItemSelectedListener(item -> {
                int id = item.getItemId();
                if (id == R.id.nav_home) {
                    loadUrl("/");
                } else if (id == R.id.nav_guides) {
                     loadUrl("/guide");
                } else if (id == R.id.nav_dashboard) {
                     loadUrl("/dashboard");
                }
                
                if (drawer != null) {
                     drawer.closeDrawer(GravityCompat.START);
                }
                return true;
            });
        }

        // ---------------------------------------------------------------------------
        // CRITICAL BACK BUTTON EXIT FIX
        // Centralized Back Handling using OnBackPressedDispatcher as requested.
        // ---------------------------------------------------------------------------
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                // 0. Handle Drawer side menu if open
                if (drawer != null && drawer.isDrawerOpen(GravityCompat.START)) {
                    Log.d("BACK_PRESS", "Drawer is open -> Closing Drawer");
                    drawer.closeDrawer(GravityCompat.START);
                    return;
                }

                // 1. If WebView exists AND can go back -> Go back in WebView
                // STOP further processing
                WebView webView = bridge.getWebView();
                boolean canGoBack = webView != null && webView.canGoBack();
                
                Log.d("BACK_PRESS", "WebViewBack: " + canGoBack);

                if (canGoBack) {
                    webView.goBack();
                    return;
                }

                // 2 & 3. Navigation Component / Fragment Manager
                // (Not applicable in this Hybrid architecture, skipped)
                Log.d("BACK_PRESS", "NavBackStack: 0"); 
                Log.d("BACK_PRESS", "FragmentBackStack: 0");

                // 4. Else (User is on Home Screen / Stack Empty) -> Show Exit Confirmation Dialog
                Log.d("BACK_PRESS", "HomeScreenReached");
                showExitConfirmationDialog();
            }
        });
    }

    private void showExitConfirmationDialog() {
        new AlertDialog.Builder(this)
            .setTitle("Exit App?")
            .setMessage("Do you want to close the application?")
            .setPositiveButton("Yes", (dialog, which) -> {
                Log.d("BACK_PRESS", "User confirmed exit -> finishAffinity()");
                finishAffinity();
            })
            .setNegativeButton("No", (dialog, which) -> {
                Log.d("BACK_PRESS", "User cancelled exit");
                dialog.dismiss();
            })
            .setCancelable(false) // Block accidental dismissal outside dialog
            .show();
    }

    private void loadUrl(String path) {
        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().evaluateJavascript("window.location.href='" + path + "'", null);
        }
    }
    
    // NOTE: onBackPressed() override removed to enforce Dispatcher usage.
}
