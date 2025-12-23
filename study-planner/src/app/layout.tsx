import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import GlobalNavigation from "@/components/GlobalNavigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import NativeMobileSpacer from "@/components/NativeMobileSpacer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dak Guru. Learn, Practice, Succeed",
  description: "Detailed study syllabus and calendar for Inspector Posts LDCE 2026",
  icons: {
    icon: "/dak-guru-new-logo.png",
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
        className={`${inter.variable} antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalNavigation />
          <NativeMobileSpacer>
            {children}
            <Footer />
          </NativeMobileSpacer>
          <MobileBottomNav />
          <WhatsAppButton />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
