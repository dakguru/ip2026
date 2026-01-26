import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studyplanner.app',
  appName: 'Dak Guru',
  webDir: 'public',
  server: {
    url: 'https://dakguru.com',
    androidScheme: 'https',
    allowNavigation: ['dakguru.com', '*.dakguru.com', 'ip2026.vercel.app']
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#ffffff",
      showSpinner: false,
      androidSplashResourceName: "splash"
    }
  }
};

export default config;
