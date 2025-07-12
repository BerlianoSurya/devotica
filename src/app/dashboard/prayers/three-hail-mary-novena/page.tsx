import GoatCounterScript from "@/components/goat-counter-sc";
import { PrayerSteps } from "@/components/prayer-steps";
import { getCurrentPath } from "@/lib/get‑current‑path";
import { getTranslations } from "next-intl/server";

export default async function Prayer() {
  const t = await getTranslations("prayers.three-hail-mary-novena");
  const steps = [
    { id: 0, title: t("signOfCross"), content: t("signOfCrossText") },
    { id: 1, title: "", content: t("firstPart") },
    { id: 2, title: "", content: t("secondPart") },
    { id: 3, title: "", content: t("thirdPart") },
    { id: 4, title: t("signOfCross"), content: t("signOfCrossText") },
  ];
  const path = await getCurrentPath();
  return (
    <div className="flex-1">
      <PrayerSteps
        title={t("title")}
        steps={steps}
        trackKey="three-hail-mary-novena"
        showProgress={false}
      />
      <GoatCounterScript path={path} />
    </div>
  );
}
