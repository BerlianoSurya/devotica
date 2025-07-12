"use client";

import { useState } from "react";
import { CustomButton } from "@/components/custom-button";
import { authClient } from "@/lib/auth-client";
import { KeyRound } from "lucide-react";
import { Toaster, toast } from "sonner";

interface LoginWithGoogleProps {
  label?: string;
  className?: string;
}

export function LoginWithGoogle({
  label = "Continue with Google",
  className = "w-full bg-primary text-white",
}: LoginWithGoogleProps) {
  const [pending, setPending] = useState(false);

  const handleSignInWithGoogle = async () => {
    try {
      setPending(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      toast.success("Succesfully logged in!");
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(errMessage);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Toaster richColors />
      <CustomButton
        onClick={handleSignInWithGoogle}
        loading={pending}
        type="button"
        className={className}
        icon={<KeyRound />}
        iconSize={20}
        size="lg"
        hoverEffect="glow"
        clickEffect="shake"
      >
        {label}
      </CustomButton>
    </>
  );
}
