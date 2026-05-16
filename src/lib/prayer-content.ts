import { getAllIdPrayers } from "@/lib/coveredprayers";

type PrayerMessages = Record<string, string>;
type MessagesFile = {
  prayers?: Record<string, PrayerMessages>;
};

export function isIndonesianOnlyPrayer(prayerId: string) {
  return getAllIdPrayers().some((prayer) => prayer.id === prayerId);
}

async function loadMessages(locale: "en" | "id"): Promise<MessagesFile> {
  return (await import(`../../messages/${locale}.json`)).default as MessagesFile;
}

export async function getPrayerMessages(
  prayerId: string,
  locale: "en" | "id"
): Promise<PrayerMessages | undefined> {
  const contentLocale = isIndonesianOnlyPrayer(prayerId) ? "id" : locale;
  const messages = await loadMessages(contentLocale);
  return messages.prayers?.[prayerId];
}
