"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconSize?: "sm" | "md" | "lg" | "xl";
  message: string;
  button?: React.ComponentType<{ onClick: () => void }>;
  leftButton?: React.ComponentType<{ onClick: () => void }>;
  rightButton?: React.ComponentType<{ onClick: () => void }>;
  children?: React.ReactNode;
  isButtonClose?: boolean;
}

const iconSizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

export default function ErrorModal({
  isOpen,
  onClose,
  title,
  icon: Icon,
  iconSize = "lg",
  message,
  button: ButtonComponent,
  leftButton: LeftButtonComponent,
  rightButton: RightButtonComponent,
  children,
  isButtonClose = true,
}: ErrorModalProps) {
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const hasCustomButtons = LeftButtonComponent || RightButtonComponent;

  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center p-4 z-40",
        isCollapsed ? "lg:left-16" : "lg:left-64"
      )}
      onClick={handleBackdropClick}
    >
      <Card
        className="max-w-md w-full animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {isButtonClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 p-0 transition-all duration-200 hover:scale-110 active:scale-90 hover:bg-destructive/10 hover:text-destructive z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}

        <CardHeader className="pb-2">
          <CardTitle className="text-center text-xl text-card-foreground mx-8">
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

          <div className="pt-2">
            {hasCustomButtons ? (
              <div className="flex gap-3 justify-center">
                {LeftButtonComponent && (
                  <LeftButtonComponent onClick={onClose} />
                )}
                {RightButtonComponent && (
                  <RightButtonComponent onClick={onClose} />
                )}
              </div>
            ) : (
              <div className="flex justify-center">
                {ButtonComponent ? (
                  <ButtonComponent onClick={onClose} />
                ) : (
                  <Button
                    onClick={onClose}
                    className="transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md active:shadow-sm"
                  >
                    OK
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
