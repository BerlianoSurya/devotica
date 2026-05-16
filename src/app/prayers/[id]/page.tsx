import {
  getPrayerData,
  getAllIdPrayers,
  getAllPrayers,
} from "@/lib/coveredprayers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import type { Metadata } from "next";
import { PrayerNavigation } from "@/components/prayer-navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getPrayerMessages } from "@/lib/prayer-content";
import { getCurrentPath } from "@/lib/get‑current‑path";
import GoatCounterScript from "@/components/goat-counter-sc";

interface PrayerPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PrayerPageProps): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "id";
  const { id } = await params;
  const post = getPrayerData(id);
  const siteUrl = process.env.SITE_URL || "http://localhost:3000";
  const prayerMessages = await getPrayerMessages(id, locale);

  if (!post) {
    return {
      title: "Post Not Found | Devotica",
      description: "The requested prayers post could not be found.",
    };
  }

  const url = `${siteUrl}/prayers/${post.id}`;

  return {
    title: `${prayerMessages?.prayersPageTitle ?? post.title} | Devotica`,
    description: prayerMessages?.prayersPageDescription ?? post.description,
    keywords: post.keywords.join(", "),
    openGraph: {
      title: `${prayerMessages?.prayersPageTitle ?? post.title} | Devotica`,
      description: prayerMessages?.prayersPageDescription ?? post.description,
      type: "article",
      url,
      authors: "Dionisius Berliano Surya Wijaya",
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${prayerMessages?.prayersPageTitle ?? post.title} | Devotica`,
      description: prayerMessages?.prayersPageDescription ?? post.description,
    },
    authors: [{ name: "Dionisius Berliano Surya Wijaya" }],
    creator: "Dionisius Berliano Surya Wijaya",
    publisher: "Dionisius Berliano Surya Wijaya",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  const posts = [...getAllPrayers(), ...getAllIdPrayers()];
  return posts.map((post) => ({
    id: post.id,
  }));
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

export default async function PrayerPage({ params }: PrayerPageProps) {
  const path = await getCurrentPath();
  const { id } = await params;
  const post = getPrayerData(id);
  const locale = (await getLocale()) as "en" | "id";
  const prayerMessages = await getPrayerMessages(id, locale);
  const buttons = await getTranslations("buttons");
  const siteUrl = process.env.SITE_URL || "http://localhost:3000";

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: `${prayerMessages?.prayersPageTitle ?? post.title} | Devotica`,
    author: {
      "@type": "Person",
      name: "Dionisius Berliano Surya Wijaya",
      url: "https://www.berliano.my.id/",
    },
    publisher: {
      "@type": "Person",
      name: "Dionisius Berliano Surya Wijaya",
      url: "https://www.berliano.my.id/",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/prayers/${post.id}`,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    wordCount: post.body.split(" ").length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex min-h-screen flex-col">
        <article className="flex-1 bg-background">
          <header className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <Link
                  href="/prayers"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {buttons("backPage")}
                </Link>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <Badge className={categoryColors[post.category]}>
                      {categoryIcons[post.category]} {post.category}
                    </Badge>
                  </div>

                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    {prayerMessages?.prayersPageTitle ?? post.title}
                  </h1>
                  <p className="text-xl text-muted-foreground md:text-2xl indent-18 text-justify">
                    {prayerMessages?.prayersPageDescription ?? post.description}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-12 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-6">
                      <MarkdownRenderer prayerId={id} />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <PrayerNavigation currentSlug={post.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <GoatCounterScript path={path} />
    </>
  );
}
