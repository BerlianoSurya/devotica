import { Button } from "@/components/ui/button";
import { Quote, Github, Globe, MonitorSmartphone, CodeXml } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { CustomButton } from "@/components/custom-button";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const quotes = [
  {
    text: "Don't pray when it rains if you don't pray when the sun shines.",
    author: "Satchel Paige",
  },
  {
    text: "Prayer is the raising of one's mind and heart to God or the requesting of good things from God.",
    author: "St. John Damascene",
  },
  {
    text: "God speaks in the silence of the heart. Listening is the beginning of prayer.",
    author: "Mother Teresa",
  },
  {
    text: "Work as if everything depends on you. Pray as if everything depends on God.",
    author: "St. Ignatius Loyola",
  },
];
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("appMetadata");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(baseUrl),
    title: t("appName"),
    description: t("appDescription"),
    keywords: t("appKeywords"),
    authors: [{ name: "Dionisius Berliano Surya Wijaya" }],
    creator: "Dionisius Berliano Surya Wijaya",
    publisher: "Dionisius Berliano Surya Wijaya",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      url: baseUrl,
      siteName: t("appName"),
      title: t("appName"),
      description: t("appDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("appName"),
      description: t("appDescription"),
      creator: "@berlianosurya9",
      site: "@berlianosurya9",
    },
    category: "Religion & Spirituality",
    classification: "Catholic Prayer Tracker Web App",
  };
}
export default function LandingPage() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, author } = quotes[randomIndex];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-col flex-1">
        <section className="w-full h-screen flex items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-purple-950/80 dark:via-slate-950 dark:to-indigo-950/90" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/20 dark:from-primary/20 dark:to-secondary/15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent dark:from-primary/10 dark:via-transparent dark:to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/15 via-transparent to-transparent dark:from-secondary/8 dark:via-transparent dark:to-transparent" />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl/none font-bold">
                  Deepen Your Faith Through{" "}
                  <span className="bg-gradient-to-br from-indigo-600 via-purple-500 to-fuchsia-700 bg-clip-text text-transparent">
                    Consistent Prayer
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
                  Access catholic prayers and track your daily prayers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 my-7">
                <Link href="/login">
                  <CustomButton
                    hoverEffect="glow"
                    clickEffect="pulse"
                    size="lg"
                    className="h-12 px-8 text-lg"
                  >
                    Get Started
                  </CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <Quote className="h-12 w-12 text-primary" />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground max-w-4xl">
                “{text}”
              </blockquote>
              <cite className="text-lg text-muted-foreground">{author}</cite>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-10">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <CodeXml className="h-8 w-8 text-primary" />,
                  title: "Open Source",
                  description:
                    "Built with transparency. Free to use and contribute.",
                },
                {
                  icon: <MonitorSmartphone className="h-8 w-8 text-primary" />,
                  title: "Always Handy",
                  description: "Access prayers anytime, anywhere.",
                },
                {
                  icon: <Globe className="h-8 w-8 text-primary" />,
                  title: "Language Support",
                  description:
                    "Currently available in English and Bahasa Indonesia. More languages coming soon.",
                },
              ].map(({ icon, title, description }, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col items-center space-y-4 rounded-lg border p-8 shadow-sm h-80 transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent"
                >
                  <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-center text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Devotica.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="rounded-full w-10 h-10">
              <Link
                href="https://github.com/BerlianoSurya/devotica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 border border-muted-foreground/20 bg-transparent hover:bg-secondary hover:border-primary transition-colors"
              >
                <Github className="h-7 w-7" />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
