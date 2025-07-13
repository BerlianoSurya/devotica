import { getAllPrayers, getAllIdPrayers } from "@/lib/coveredprayers";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("appMetadata");
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  console.log("BASE", baseUrl);
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
const categoryColors = {
  prayer: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  novena:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  devotion: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rosary: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
};

const categoryIcons = {
  prayer: "🙏",
  novena: "✨",
  devotion: "❤️",
  rosary: "📿",
};

export default async function PrayersIndexPage() {
  const allPrayers = getAllPrayers();
  const idPrayers = getAllIdPrayers();
  const t = await getTranslations("prayers");
  const a = await getTranslations("app");
  const am = await getTranslations("appMetadata");
  const locale = await getLocale();

  const mergedPrayers =
    locale === "id" ? [...allPrayers, ...idPrayers] : allPrayers;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: am("appName"),
    description: am("appDescription"),
    url: `${process.env.SITE_URL || "http://localhost:3000"}/prayers`,
    publisher: {
      "@type": "Person",
      name: "Dionisius Berliano Surya Wijaya",
      url: "https://www.berliano.my.id/",
    },
    blogPost: allPrayers.map((post) => ({
      "@type": "BlogPosting",
      headline: `${t(`${post.id}.prayersPageTitle`)}`,
      description: `${t(`${post.id}.prayersPageDescription`)}`,
      url: `${process.env.SITE_URL || "http://localhost:3000"}/prayers/${
        post.id
      }`,
      author: {
        "@type": "Person",
        name: "Dionisius Berliano Surya Wijaya",
      },
      keywords: post.keywords?.join(", "),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 flex min-h-[calc(100vh)] flex-col">
        <main className="flex-1 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {a("prayersPageTitle")}
              </h1>
              <div className="container px-4 md:px-6 mt-7">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {mergedPrayers.map((post) => (
                    <Link
                      key={post.id}
                      href={`/prayers/${post.id}`}
                      className="group"
                    >
                      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:scale-[1.02]">
                        <CardHeader className="space-y-4">
                          <div className="flex items-center justify-start">
                            <Badge className={categoryColors[post.category]}>
                              {categoryIcons[post.category]} {post.category}
                            </Badge>
                          </div>
                          <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors text-xl sm:text-xl md:text-2xl lg:text-3xl">
                            <h1>{t(`${post.id}.prayersPageTitle`)}</h1>
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {t(`${post.id}.prayersPageDescription`)}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
