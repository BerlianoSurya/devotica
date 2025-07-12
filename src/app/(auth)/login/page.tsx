"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { LoginWithGoogle } from "@/components/login-with-google";
import { CustomButton } from "@/components/custom-button";
import { redirect } from "next/navigation";
import { Undo2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Devotica Logo"
              width={100}
              height={100}
              className="h-22 w-22"
            />
          </div>
          <CardTitle className="text-3xl text-center">Welcome!</CardTitle>
          <CardDescription className="text-lg text-center">
            Sign in to Devotica with Google
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginWithGoogle />

          <CustomButton
            onClick={() => redirect("/")}
            type="button"
            className={"w-full bg-accent text-primary"}
            icon={<Undo2 />}
            variant="ghost"
            hoverEffect="scale"
          >
            Back to home
          </CustomButton>
        </CardContent>
      </Card>
    </div>
  );
}
