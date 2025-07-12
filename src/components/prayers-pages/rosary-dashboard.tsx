"use client";

import { useState, useEffect, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { CustomButton } from "../custom-button";
import { trackUserPrayer } from "@/actions/prayers-action";
import { toast, Toaster } from "sonner";
import ErrorModal from "../error-modal";
import { useRouter } from "next/navigation";

type MysteryType = "joyful" | "sorrowful" | "glorious" | "luminous";

interface RosaryStep {
  id: number;
  type: "prayer" | "mystery" | "our_father" | "hail_mary" | "glory_be";
  title: string;
  content: string;
  count?: number;
}

export function RosaryDashboard() {
  const t = useTranslations("prayers.rosary");
  const [selectedMystery, setSelectedMystery] = useState<MysteryType>("joyful");
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Get mystery based on day of week
  const getTodaysMystery = (): MysteryType => {
    const day = new Date().getDay();
    switch (day) {
      case 1:
      case 6:
        return "joyful"; // Monday, Saturday
      case 2:
      case 5:
        return "sorrowful"; // Tuesday, Friday
      case 0:
      case 3:
        return "glorious"; // Sunday, Wednesday
      case 4:
        return "luminous"; // Thursday
      default:
        return "joyful";
    }
  };

  useEffect(() => {
    setSelectedMystery(getTodaysMystery());
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextStep();
      } else if (event.key === "ArrowLeft") {
        prevStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep]);

  const handleClick = () => {
    startTransition(async () => {
      const res = await trackUserPrayer(`rosary`);
      if (!res.success) {
        setShowErrorModal(true);
        setErrorMessage(`${res.message}`);
      }
      if (res.success) {
        toast.success("Your prayer is tracked");
        resetFn();
      }
    });
  };

  const ErrorButton = () => (
    <Button
      onClick={() => setShowErrorModal(false)}
      className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md active:shadow-sm"
    >
      Close
    </Button>
  );

  const mysteries = {
    joyful: [
      {
        title: t("mysteries.joyful.1.title"),
        content: t("mysteries.joyful.1.content"),
      },
      {
        title: t("mysteries.joyful.2.title"),
        content: t("mysteries.joyful.2.content"),
      },
      {
        title: t("mysteries.joyful.3.title"),
        content: t("mysteries.joyful.3.content"),
      },
      {
        title: t("mysteries.joyful.4.title"),
        content: t("mysteries.joyful.4.content"),
      },
      {
        title: t("mysteries.joyful.5.title"),
        content: t("mysteries.joyful.5.content"),
      },
    ],
    sorrowful: [
      {
        title: t("mysteries.sorrowful.1.title"),
        content: t("mysteries.sorrowful.1.content"),
      },
      {
        title: t("mysteries.sorrowful.2.title"),
        content: t("mysteries.sorrowful.2.content"),
      },
      {
        title: t("mysteries.sorrowful.3.title"),
        content: t("mysteries.sorrowful.3.content"),
      },
      {
        title: t("mysteries.sorrowful.4.title"),
        content: t("mysteries.sorrowful.4.content"),
      },
      {
        title: t("mysteries.sorrowful.5.title"),
        content: t("mysteries.sorrowful.5.content"),
      },
    ],
    glorious: [
      {
        title: t("mysteries.glorious.1.title"),
        content: t("mysteries.glorious.1.content"),
      },
      {
        title: t("mysteries.glorious.2.title"),
        content: t("mysteries.glorious.2.content"),
      },
      {
        title: t("mysteries.glorious.3.title"),
        content: t("mysteries.glorious.3.content"),
      },
      {
        title: t("mysteries.glorious.4.title"),
        content: t("mysteries.glorious.4.content"),
      },
      {
        title: t("mysteries.glorious.5.title"),
        content: t("mysteries.glorious.5.content"),
      },
    ],
    luminous: [
      {
        title: t("mysteries.luminous.1.title"),
        content: t("mysteries.luminous.1.content"),
      },
      {
        title: t("mysteries.luminous.2.title"),
        content: t("mysteries.luminous.2.content"),
      },
      {
        title: t("mysteries.luminous.3.title"),
        content: t("mysteries.luminous.3.content"),
      },
      {
        title: t("mysteries.luminous.4.title"),
        content: t("mysteries.luminous.4.content"),
      },
      {
        title: t("mysteries.luminous.5.title"),
        content: t("mysteries.luminous.5.content"),
      },
    ],
  };

  const generateRosarySteps = (): RosaryStep[] => {
    const steps: RosaryStep[] = [];
    let id = 0;

    // Opening prayers
    steps.push({
      id: id++,
      type: "prayer",
      title: t("signOfCross"),
      content: t("signOfCrossText"),
    });

    steps.push({
      id: id++,
      type: "prayer",
      title: t("apostlesCreed"),
      content: t("apostlesCreedText"),
    });

    steps.push({
      id: id++,
      type: "our_father",
      title: t("ourFather"),
      content: t("ourFatherText"),
    });

    steps.push({
      id: id++,
      type: "hail_mary",
      title: t("firstHailMary"),
      content: t("firstHailMaryText"),
    });

    steps.push({
      id: id++,
      type: "hail_mary",
      title: t("secondHailMary"),
      content: t("secondHailMaryText"),
    });

    steps.push({
      id: id++,
      type: "hail_mary",
      title: t("thirdHailMary"),
      content: t("thirdHailMaryText"),
    });

    steps.push({
      id: id++,
      type: "glory_be",
      title: t("gloryBe"),
      content: t("gloryBeText"),
    });

    // 5 Decades
    const currentMysteries = mysteries[selectedMystery];
    for (let decade = 0; decade < 5; decade++) {
      // Announce mystery
      steps.push({
        id: id++,
        type: "mystery",
        title: `${t("mysteryAnnouncement")} ${decade + 1}: ${
          currentMysteries[decade].title
        }`,
        content: `${currentMysteries[decade].content}`,
      });

      // Our Father
      steps.push({
        id: id++,
        type: "our_father",
        title: t("ourFather"),
        content: t("ourFatherText"),
      });

      // 10 Hail Marys
      for (let i = 0; i < 10; i++) {
        steps.push({
          id: id++,
          type: "hail_mary",
          title: `${t("hailMary")} ${i + 1}/10`,
          content: t("hailMaryText"),
        });
      }

      // Glory Be
      steps.push({
        id: id++,
        type: "glory_be",
        title: t("gloryBe"),
        content: t("gloryBeText"),
      });
    }

    // Closing prayers
    steps.push({
      id: id++,
      type: "prayer",
      title: t("hailHolyQueen"),
      content: t("hailHolyQueenText"),
    });

    steps.push({
      id: id++,
      type: "prayer",
      title: t("finalPrayer"),
      content: t("finalPrayerText"),
    });

    return steps;
  };

  const steps = generateRosarySteps();
  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetFn = () => {
    setCurrentStep(0);
  };

  const currentStepData = steps[currentStep];
  const paragraphs = currentStepData.content
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <>
      <div className=" bg-background">
        <header className="top-0 z-10 bg-background">
          <div className="container mx-auto px-4 py-4 max-w-4xl">
            <div className="relative flex items-center justify-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold underline underline-offset-8 max-w-[70%]">
                {t("title")}
              </h1>

              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="absolute left-0 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="border rounded-lg p-4 sm:p-6 bg-card">
            {/* Mystery Selection */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  {t("selectMystery")}
                </label>
                <Select
                  value={selectedMystery}
                  onValueChange={(value: MysteryType) => {
                    setSelectedMystery(value);
                    resetFn();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joyful">
                      {t("mysteryTypes.joyful")}
                    </SelectItem>
                    <SelectItem value="sorrowful">
                      {t("mysteryTypes.sorrowful")}
                    </SelectItem>
                    <SelectItem value="glorious">
                      {t("mysteryTypes.glorious")}
                    </SelectItem>
                    <SelectItem value="luminous">
                      {t("mysteryTypes.luminous")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Badge variant="secondary" className="mb-0">
                  {t("todaysMystery")}:{" "}
                  {t(`mysteryTypes.${getTodaysMystery()}`)}
                </Badge>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span className="font-medium">Progress</span>
                <span>
                  Step {currentStep + 1} of {steps.length} (
                  {Math.round(progress)}
                  %)
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="mb-6">
              <CardHeader className="">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {currentStepData?.title}
                  </CardTitle>
                  <Badge
                    variant={
                      currentStepData?.type === "mystery"
                        ? "default"
                        : currentStepData?.type === "our_father"
                        ? "secondary"
                        : currentStepData?.type === "hail_mary"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {t(`stepTypes.${currentStepData?.type}`)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-50 sm:h-65 lg:h-70 overflow-y-auto">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm sm:text-base leading-relaxed whitespace-pre-line pr-2  indent-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
              <CustomButton
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                icon={<ChevronLeft />}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
                clickEffect="bounce"
              >
                Previous
              </CustomButton>

              <CustomButton
                variant="outline"
                onClick={resetFn}
                disabled={currentStep === 0}
                icon={<RotateCcw />}
                className=""
                clickEffect="bounce"
              >
                Reset
              </CustomButton>
              {currentStep === steps.length - 1 ? (
                <CustomButton
                  onClick={handleClick}
                  loading={isPending}
                  disabled={isPending}
                  isRightIcon={true}
                  hoverEffect="glow"
                  clickEffect="bounce"
                  iconSize={20}
                  icon={<ChevronRight />}
                >
                  Finish Prayer
                </CustomButton>
              ) : (
                <CustomButton
                  onClick={nextStep}
                  hoverEffect="glow"
                  clickEffect="bounce"
                  isRightIcon={true}
                  icon={<ChevronRight />}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                  disabled={currentStep === steps.length - 1}
                >
                  Next
                </CustomButton>
              )}
            </div>
          </div>
        </main>

        <Toaster richColors />
        <ErrorModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="Error Occurred"
          icon={AlertCircle}
          iconSize="lg"
          message={errorMessage}
          button={ErrorButton}
          isButtonClose={false}
        ></ErrorModal>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Mystery Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t(`mysteryTypes.${selectedMystery}`)}</CardTitle>
            <CardDescription>{t("mysteries.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {mysteries[selectedMystery].map((mystery, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {index + 1}. {mystery.title}
                  </h4>
                  <p className="text-muted-foreground">{mystery.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
