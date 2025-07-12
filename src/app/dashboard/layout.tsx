import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardShell from "@/components/dashboard-shell";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Devotica Dashboard",
  description: "Track your daily prayers with Devotica",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }
  return (
    <NextIntlClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <DashboardShell user={session.user}>{children}</DashboardShell>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
