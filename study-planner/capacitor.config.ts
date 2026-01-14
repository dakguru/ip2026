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
      launchAutoHide: false,
      backgroundColor: "#000000",
      showSpinner: false,
      androidSplashResourceName: "splash"
    }
  }
};

export default config;
