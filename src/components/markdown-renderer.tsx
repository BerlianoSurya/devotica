"use server";

import { marked } from "marked";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { getLocale } from "next-intl/server";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { getPrayerMessages } from "@/lib/prayer-content";

marked.use(gfmHeadingId());

interface MarkdownRendererProps {
  prayerId: string;
}

export async function MarkdownRenderer({ prayerId }: MarkdownRendererProps) {
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const locale = (await getLocale()) as "en" | "id";
  const prayerMessages = await getPrayerMessages(prayerId, locale);
  const rawMarkdown = prayerMessages?.prayersPageBody ?? "";
  const html = purify.sanitize(await marked(rawMarkdown));
  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-muted-foreground prose-li:text-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
