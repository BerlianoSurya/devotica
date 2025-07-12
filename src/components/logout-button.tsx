"use client";

import { useLogout } from "@/hooks/useLogout";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { CustomButton } from "./custom-button";

export function LogoutButton({ isCollapsed }: { isCollapsed: boolean }) {
  const { logout } = useLogout();

  return (
    <CustomButton
      variant="ghost"
      onClick={() => logout()}
      icon={
        <LogOut
          className={cn("h-4 w-4 flex-shrink-0", isCollapsed ? "mr-0" : "mr-3")}
        />
      }
      className={cn(
        "flex items-center w-full rounded-md transition-colors",
        isCollapsed ? "px-0 py-2 justify-center" : "px-3 py-2 text-sm",
        "text-red-800 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-400 dark:hover:bg-red-900/20"
      )}
    >
      {!isCollapsed && `Logout`}
    </CustomButton>
  );
}
