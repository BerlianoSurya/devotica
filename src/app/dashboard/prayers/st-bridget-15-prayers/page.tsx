import GoatCounterScript from "@/components/goat-counter-sc";
import { PrayerSteps } from "@/components/prayer-steps";
import { getCurrentPath } from "@/lib/get‑current‑path";
import { getTranslations } from "next-intl/server";

function seq(n: number): string {
  const sequences = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fifteenth",
  ];
  return sequences[n - 1];
}
export default async function Prayer() {
  const t = await getTranslations("prayers.st-bridget-15-prayers");
  const steps = (() => {
    const steps = [];
    let id = 0;

    steps.push({
      id: id++,
      title: t("signOfCross"),
      content: t("signOfCrossText"),
    });

    for (let i = 1; i <= 15; i++) {
      steps.push({
        id: id++,
        title: t("ourFather"),
        content: t("ourFatherText"),
      });

      steps.push({
        id: id++,
        title: t("hailMary"),
        content: t("hailMaryText"),
      });

      steps.push({
        id: id++,
        title: t(`${seq(i)}PrayerTitle`),
        content: t(`${seq(i)}Prayer`),
      });
    }

    steps.push({
      id: id++,
      title: t("conclusionTitle"),
      content: t("conclusion"),
    });

    steps.push({
      id: id++,
      title: t("signOfCross"),
      content: t("signOfCrossText"),
    });

    return steps;
  })();
  const path = await getCurrentPath();
  return (
    <div className="flex-1">
      <PrayerSteps
        title={t("title")}
        steps={steps}
        trackKey="st-bridget-15-prayers"
        showProgress={true}
      />
      <GoatCounterScript path={path} />
    </div>
  );
}
