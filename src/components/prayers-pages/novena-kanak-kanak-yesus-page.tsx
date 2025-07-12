"use client";

import { useState, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { trackUserPrayer } from "@/actions/prayers-action";
import { useRouter } from "next/navigation";
import { CustomButton } from "../custom-button";
import ErrorModal from "../error-modal";
import { toast, Toaster } from "sonner";

interface SacredHeartOfJesusStep {
  id: number;
  title: string;
  content: string;
  count?: number;
}

export function NovenaKanakKanakYesus() {
  const t = useTranslations("prayers.novena-kanak-kanak-yesus");
  const b = useTranslations("buttons");
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();
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
      const res = await trackUserPrayer(`novena-kanak-kanak-yesus`);
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

  const generateSteps = (): SacredHeartOfJesusStep[] => {
    const steps: SacredHeartOfJesusStep[] = [];
    let id = 0;

    steps.push({
      id: id++,
      title: t("signOfCross"),
      content: t("signOfCrossText"),
    });

    steps.push({
      id: id++,
      title: t("prayerBodyTitle"),
      content: t("prayerBody"),
    });
    steps.push({
      id: id++,
      title: t("signOfCross"),
      content: t("signOfCrossText"),
    });

    return steps;
  };

  const steps = generateSteps();
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
  const paragraphs = currentStepData.content.split("\n").map((p) => p.trim());

  const ErrorButton = () => (
    <Button
      onClick={() => setShowErrorModal(false)}
      className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md active:shadow-sm"
    >
      Close
    </Button>
  );

  if (locale !== "id") {
    return (
      <div className="bg-background">
        <ErrorModal
          isOpen={true}
          onClose={() => setShowErrorModal(false)}
          title="Error Occurred"
          icon={AlertCircle}
          iconSize="lg"
          message={
            "Not available for this language. \nChoose another language!"
          }
          isButtonClose={false}
        ></ErrorModal>
      </div>
    );
  }

  return (
    <div className=" bg-background">
      <header className="top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="relative flex items-center justify-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold underline underline-offset-8 max-w-[70%] text-center">
              {t("title")}
            </h1>

            <Button
              variant="outline"
              size="sm"
              // onClick={() => router.back()}
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
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span className="font-medium">Progress</span>
              <span>
                Step {currentStep + 1} of {steps.length} ({Math.round(progress)}
                %)
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="mb-6">
            <CardHeader className="">
              <CardTitle className="text-lg sm:text-xl">
                {currentStepData?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 sm:h-75 lg:h-85 overflow-y-auto">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm sm:text-base leading-relaxed whitespace-pre-line pr-2  indent-8"
                  >
                    {paragraph === "" ? "\u00A0" : paragraph}
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
  );
}
