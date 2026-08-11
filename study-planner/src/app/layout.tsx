import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CourseProvider } from "@/contexts/CourseContext";
import GlobalNavigation from "@/components/GlobalNavigation";

import ConditionalFooter from "@/components/ConditionalFooter";
import MobileBottomNav from "@/components/MobileBottomNav";
import NativeMobileSpacer from "@/components/NativeMobileSpacer";
import NativePageTransition from "@/components/NativePageTransition";
import NativeInteractions from "@/components/NativeInteractions";
import NativeStatusBar from "@/components/NativeStatusBar";
import UserActivityTracker from "@/components/UserActivityTracker";
import BackButtonHandler from "@/components/BackButtonHandler";
import AppLoadingScreen from "@/components/AppLoadingScreen";
import PushNotificationManager from "@/components/PushNotificationManager";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Dak Guru. Learn, Practice, Succeed",
  description: "Detailed study syllabus and calendar for Inspector Posts LDCE 2026",
  icons: {
    icon: "/dak-guru-round.png",
    apple: "/dak-guru-round.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{ backgroundColor: '#0f172a' }}
        className={`${inter.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CourseProvider>
            <AppLoadingScreen />
            <NativeStatusBar />
            <UserActivityTracker />
            <NativeInteractions />
            <BackButtonHandler />
            <PushNotificationManager />
            <GlobalNavigation />
            <NativeMobileSpacer>
              <NativePageTransition>{children}</NativePageTransition>
              <ConditionalFooter />
            </NativeMobileSpacer>
            <MobileBottomNav />


            <SpeedInsights />
            <Analytics />
          </CourseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
