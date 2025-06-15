import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardShell from "@/components/dashboard-shell";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devotica Dashboard",
  description: "Track your daily prayers, novenas, and rosaries with Devotica",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <DashboardShell user={session.user}>{children}</DashboardShell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
