"use client";

import type React from "react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, X, Plus, Cross, Trash2, Check } from "lucide-react";
import type { CalendarDay } from "./types";
import { cn, formatPrayerTitle, isNotTodayOrPast } from "@/lib/utils";
import { prayers } from "../prayers-data";
import { CustomButton } from "../custom-button";
import { removeUserPrayerLog } from "@/actions/prayers-action";
import AddPrayerManually from "../add-prayer-manually";

interface DayPrayersModalProps {
  selectedDay: CalendarDay;
  onClose: () => void;
}

export default function DayPrayersModal({
  selectedDay,
  onClose,
}: DayPrayersModalProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chooseDeleteId, setChooseDeleteId] = useState("");
  const [isPending, startTransition] = useTransition();
  const [prayerLogs, setPrayerLogs] = useState(selectedDay.prayerLogs);
  const [isExistTrackToggled, setIsExistTrackToggled] = useState(false);
  const [isNotExistTrackToggled, setIsNotExistTrackToggled] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem("sidebar-collapsed");
      if (savedState !== null) {
        setIsCollapsed(JSON.parse(savedState));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const savedState = localStorage.getItem("sidebar-collapsed");
      if (savedState !== null) {
        const newState = JSON.parse(savedState);
        if (newState !== isCollapsed) {
          setIsCollapsed(newState);
        }
      }
    }, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [isCollapsed]);

  const handleDeletePrayerLog = () => {
    startTransition(async () => {
      if (chooseDeleteId === "") {
        return { message: "Id is required" };
      }

      const deleted = await removeUserPrayerLog(chooseDeleteId);
      if (deleted.success) {
        setPrayerLogs((prev) =>
          prev.filter((log) => log.id !== chooseDeleteId)
        );
        setIsExistTrackToggled(false);
        setIsNotExistTrackToggled(false);
      }
      return;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPrayerDetails = (prayerId: string) => {
    return prayers.find((p) => p.id === prayerId);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Marian Devotions":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Novenas":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Chaplets":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Sacred Heart":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Daily Prayers":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
      case "Lenten Devotions":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Litanies":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center p-4 z-40",
        isCollapsed ? "lg:left-16" : "lg:left-64"
      )}
      onClick={handleBackdropClick}
    >
      <Card
        className="max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
              <Cross className="h-5 w-5 text-primary" />
              Prayer Log: {formatDate(selectedDay.date)}
            </CardTitle>
            <CardDescription className="mt-1">
              {prayerLogs.length === 0
                ? "No prayers tracked"
                : `${prayerLogs.length} prayer${
                    prayerLogs.length === 1 ? "" : "s"
                  } tracked`}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        {!isNotTodayOrPast(selectedDay.date) ? (
          <>
            <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
              {prayerLogs.length === 0 ? (
                <div className="flex flex-col gap-8 justify-center py-8">
                  {!isNotExistTrackToggled ? (
                    <>
                      <div>
                        <Cross className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-center text-lg font-semibold text-card-foreground mb-2">
                          No prayers tracked today
                        </h3>
                      </div>

                      <CustomButton
                        onClick={() => setIsNotExistTrackToggled(true)}
                        className=" cursor-pointer"
                        icon={<Plus />}
                        hoverEffect="glow"
                        clickEffect="shake"
                      >
                        Track Prayer Manually
                      </CustomButton>
                    </>
                  ) : (
                    <div className="flex justify-center">
                      <AddPrayerManually
                        date={selectedDay.date}
                        prayerLogs={prayerLogs}
                        setPrayerLogs={setPrayerLogs}
                        setIsExistTrackToggled={setIsNotExistTrackToggled}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {prayerLogs
                    .sort((a, b) => a.prayedAt.localeCompare(b.prayedAt))
                    .map((prayerLog) => {
                      const prayerDetails = getPrayerDetails(
                        prayerLog.prayerId
                      );
                      const isConfirmingDelete =
                        chooseDeleteId === prayerLog.id;

                      return (
                        <div
                          key={prayerLog.id}
                          className={cn(
                            "p-4 rounded-lg border border-border bg-background",
                            !isConfirmingDelete &&
                              "hover:bg-accent transition-colors duration-200",
                            "group"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {!isConfirmingDelete ? (
                              <>
                                <div className="flex-1 cursor-pointer">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-card-foreground">
                                      {formatPrayerTitle(
                                        prayerLog.prayerTitle
                                      ) || "Unknown Prayer"}
                                    </h4>
                                    {prayerDetails && (
                                      <Badge
                                        className={cn(
                                          "text-xs",
                                          getCategoryColor(
                                            prayerDetails.category
                                          )
                                        )}
                                      >
                                        {prayerDetails.category}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2" />
                                      {new Date(
                                        prayerLog.prayedAt
                                      ).toLocaleDateString()}
                                    </div>
                                    {prayerDetails && (
                                      <div className="flex items-center">
                                        <span className="text-muted-foreground">
                                          {prayerDetails.duration}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <CustomButton
                                  onClick={() =>
                                    setChooseDeleteId(prayerLog.id)
                                  }
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive transition-opacity"
                                  clickEffect="shake"
                                  hoverEffect="scale"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </CustomButton>
                              </>
                            ) : (
                              <>
                                <div className="flex-1 underline">
                                  <p>
                                    Do you want to delete this tracked prayer?
                                  </p>
                                </div>
                                <div className="flex gap-2 justify-between">
                                  <CustomButton
                                    variant="outline"
                                    size="sm"
                                    className="hover:bg-destructive"
                                    onClick={() => {
                                      handleDeletePrayerLog();
                                    }}
                                    loading={isPending}
                                    clickEffect="shake"
                                    hoverEffect="scale"
                                  >
                                    {!isPending && (
                                      <Check className="h-4 w-4" />
                                    )}
                                  </CustomButton>
                                  <CustomButton
                                    onClick={() => setChooseDeleteId("")}
                                    variant="outline"
                                    className="text-white"
                                    size="sm"
                                    disabled={isPending}
                                    clickEffect="bounce"
                                    hoverEffect="lift"
                                  >
                                    <X className="h-4 w-4" />
                                  </CustomButton>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </CardContent>

            {prayerLogs.length > 0 && !isExistTrackToggled && (
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <CustomButton
                    className="flex-1 cursor-pointer"
                    icon={<Plus />}
                    hoverEffect="glow"
                    clickEffect="shake"
                    onClick={() => setIsExistTrackToggled(true)}
                  >
                    Track Prayer Manually
                  </CustomButton>
                </div>
              </div>
            )}
            {isExistTrackToggled && (
              <div className="border-t border-border flex justify-center">
                <AddPrayerManually
                  date={selectedDay.date}
                  setPrayerLogs={setPrayerLogs}
                  setIsExistTrackToggled={setIsExistTrackToggled}
                />
              </div>
            )}
          </>
        ) : null}
      </Card>
    </div>
  );
}
