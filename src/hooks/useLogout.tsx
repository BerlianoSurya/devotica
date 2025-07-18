"use client";

import { authClient } from "@/lib/auth-client";

export const useLogout = () => {
  const logout = async (options?: { onSuccess?: () => void }) => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // app router caches the page, so if we use router.push it MIGHT return the cached page 🥲
            window.location.href = "/login";

            options?.onSuccess?.();
          },
        },
      });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return { logout };
};
