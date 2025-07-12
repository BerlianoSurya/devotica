import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomButton } from "./custom-button";
import { prayers } from "./prayers-data";
import { useState, useTransition } from "react";
import { trackUserPrayerManually } from "@/actions/prayers-action";
import { Toaster } from "sonner";
import ErrorModal from "./error-modal";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function AddPrayerManually({
  setIsExistTrackToggled,
  date,
  setPrayerLogs,
}: {
  setIsExistTrackToggled: React.Dispatch<React.SetStateAction<boolean>>;
  date: string;
  setPrayerLogs: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        prayedAt: string;
        prayerId: string;
        prayerTitle: string;
      }[]
    >
  >;
}) {
  const [selectedPrayer, setSelectedPrayer] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleClick = () => {
    if (selectedPrayer === "") {
      setError(true);
      return;
    }
    startTransition(async () => {
      const result = await trackUserPrayerManually(date, selectedPrayer);
      if (!result.success) {
        setShowErrorModal(true);
        setErrorMessage(`${result.message}`);
      }
      startTransition(() => {
        if (result.newTrackedPrayer) {
          const selectedItem = prayers.find(
            (item) => item.id === selectedPrayer
          );
          const mappedLog = {
            id: result.newTrackedPrayer.id,
            prayedAt: result.newTrackedPrayer.prayedAt,
            prayerId: result.newTrackedPrayer.prayerId,
            prayerTitle: selectedItem?.title || "",
          };

          setPrayerLogs((prev) => [...prev, mappedLog]);
          setIsExistTrackToggled(false);
        }
      });
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

  return (
    <div className="mt-4">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col gap-2">
          <p>Select a prayer:</p>
          <Select required onValueChange={(value) => setSelectedPrayer(value)}>
            <SelectTrigger className="w-60 md:w-80 lg:w-140">
              <SelectValue placeholder="Prayers" />
            </SelectTrigger>
            <SelectContent>
              {prayers.map((el) => {
                return (
                  <SelectItem key={el.id} value={el.id}>
                    {el.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {isError && selectedPrayer === "" && (
            <p className="text-destructive text-sm">
              You must select a prayer!
            </p>
          )}
        </div>
        <div className="flex gap-5 items-center justify-center">
          <CustomButton
            hoverEffect="glow"
            clickEffect="bounce"
            onClick={handleClick}
            loading={isPending}
            disabled={isPending}
          >
            Track Prayer
          </CustomButton>
          <CustomButton
            variant="outline"
            hoverEffect="lift"
            onClick={() => setIsExistTrackToggled(false)}
            disabled={isPending}
          >
            Cancel
          </CustomButton>
        </div>
      </div>

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
