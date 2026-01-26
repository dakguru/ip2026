import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studyplanner.app',
  appName: 'Dak Guru',
  webDir: 'public',
  server: {
    url: 'https://ip2026.vercel.app',
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 500,
      backgroundColor: "#ffffff",
      showSpinner: false,
      androidSplashResourceName: "splash"
    }
  }
};

export default config;
