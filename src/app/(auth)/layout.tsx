import type React from "react";
import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Login to Devotica a Catholic Prayer Tracker",
  description: "Track your daily prayers, novenas, and rosaries with Devotica",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Script
        data-goatcounter={process.env.GOATCOUNTER_URL}
        data-goatcounter-settings='{"allow_local": true, "path": "/login"}'
        async
        src="//gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
    </>
  );
}
