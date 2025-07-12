import type React from "react";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextIntlClientProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
      <Script
        data-goatcounter={process.env.GOATCOUNTER_URL}
        data-goatcounter-settings='{"allow_local": true, "path": "/"}'
        async
        src="//gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
    </>
  );
}
