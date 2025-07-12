"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, RotateCcw, Home } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  const handleGoHome = () => {
    router.push("/dashboard");
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4 ">
      <Card className="w-full max-w-lg mx-auto shadow-lg border-destructive/20">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-destructive">
            Dashboard Error
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground mt-2">
            There was an issue loading your prayer dashboard. Let's get you back
            on track.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs font-mono text-muted-foreground break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Go Back</span>
              <span className="sm:hidden">Back</span>
            </Button>

            <Button onClick={reset} variant="default" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Try Again</span>
              <span className="sm:hidden">Retry</span>
            </Button>

            <Button
              onClick={handleGoHome}
              variant="secondary"
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
