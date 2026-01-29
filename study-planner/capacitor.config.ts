import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studyplanner.app',
  appName: 'Dak Guru',
  webDir: 'public',
  server: {
    url: 'https://dakguru.com',
    androidScheme: 'https',
    allowNavigation: [
      'dakguru.com',
      '*.dakguru.com',
      'ip2026.vercel.app',
      '*.razorpay.com',
      'api.razorpay.com',
      'checkout.razorpay.com'
    ]
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 3000,
      backgroundColor: "#ffffff",
      showSpinner: false,
      androidSplashResourceName: "splash"
    }
  }
};

export default config;
