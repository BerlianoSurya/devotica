"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PermanentModalProps {
  title: string;
  iconType: "alert" | "warning" | "info" | "error";
  iconSize?: "sm" | "md" | "lg" | "xl";
  message: string;
  buttonType?: "single" | "double";
  children?: React.ReactNode;
}

const iconSizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

import { AlertTriangle, Info, XCircle } from "lucide-react";

const iconMap = {
  alert: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

export default function PermanentModal({
  title,
  iconType,
  iconSize = "lg",
  message,
  children,
}: PermanentModalProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const Icon = iconMap[iconType];

  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center p-4 z-40",
        isCollapsed ? "lg:left-16" : "lg:left-64"
      )}
    >
      <Card className="max-w-md w-full animate-in zoom-in-95 duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-xl text-card-foreground">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-destructive/10">
              <Icon
                className={cn(iconSizeClasses[iconSize], "text-destructive")}
              />
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">{message}</p>
          {children && (
            <div className="bg-muted/50 rounded-lg p-4 text-left">
              {children}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
