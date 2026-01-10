package com.studyplanner.app;

import android.os.Bundle;
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
        // Ensure toolbar exists before setting it (it should be in activity_main.xml)
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
                // Simple Navigation Logic
                // Note: Direct URL loading might be simpler for this requirement
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
    }

    private void loadUrl(String path) {
        if (this.bridge != null && this.bridge.getWebView() != null) {
            // Using javascript location href to navigate within the SP/Next router context if possible
            // Or simpler: just standard webview load if it's hash router or similar. 
            // Since it's Next.js, window.location.href usually triggers a full reload which is fine, 
            // or we could try to push history state if we knew the internal router.
            // Full reload is safer to ensure state consistency.
            this.bridge.getWebView().evaluateJavascript("window.location.href='" + path + "'", null);
        }
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        if (drawer != null && drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }
}
