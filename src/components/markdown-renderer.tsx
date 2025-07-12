import { marked } from "marked";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { getTranslations } from "next-intl/server";
import { gfmHeadingId } from "marked-gfm-heading-id";

const window = new JSDOM("").window;
const purify = DOMPurify(window);
marked.use(gfmHeadingId());

interface MarkdownRendererProps {
  prayerId: string;
}

export async function MarkdownRenderer({ prayerId }: MarkdownRendererProps) {
  const t = await getTranslations(`prayers.${prayerId}`);
  const rawMarkdown = t("prayersPageBody");
  const html = purify.sanitize(await marked(rawMarkdown));
  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-muted-foreground prose-li:text-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
