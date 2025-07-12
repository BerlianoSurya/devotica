import GoatCounterScript from "@/components/goat-counter-sc";
import { PrayerSteps } from "@/components/prayer-steps";
import { getCurrentPath } from "@/lib/get‑current‑path";
import { getTranslations } from "next-intl/server";

export default async function Prayer() {
  const t = await getTranslations("prayers.sacred-heart-of-jesus");
  const steps = [
    { id: 0, title: t("signOfCross"), content: t("signOfCrossText") },
    { id: 1, title: t("prayerBodyTitle"), content: t("prayerBody") },
    { id: 4, title: t("signOfCross"), content: t("signOfCrossText") },
  ];
  const path = await getCurrentPath();
  return (
    <div className="flex-1">
      <PrayerSteps
        title={t("title")}
        steps={steps}
        trackKey="sacred-heart-of-jesus"
        showProgress={false}
      />
      <GoatCounterScript path={path} />
    </div>
  );
}
