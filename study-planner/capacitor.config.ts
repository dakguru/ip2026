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
  android: {
    backgroundColor: '#0f172a'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 0,
      backgroundColor: "#0f172a",
      showSpinner: false
    }
  }
};

export default config;
