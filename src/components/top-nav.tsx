"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu } from "lucide-react";
import Profile01 from "./profile-modal";
import { ThemeToggle } from "./theme-toggle";
import LocaleSwitcher from "./locale-switcher";

interface TopNavProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  user: {
    name: string;
    email?: string;
    image?: string | null;
  };
}

export default function TopNav({ user, onToggleSidebar }: TopNavProps) {
  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-background border-b border-border h-full">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 hover:bg-accent rounded-md transition-colors"
        >
          <Menu className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto ">
        <LocaleSwitcher />
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src={
                user.image ||
                "https://0.gravatar.com/avatar/0958046148db4f9ef731681465b50762d38362524b7f4a2c02c679fd94cc6cff?size=256&d=initials"
              }
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-border sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-popover border-border rounded-lg shadow-lg"
          >
            <Profile01
              avatar={
                user.image ||
                "https://0.gravatar.com/avatar/0958046148db4f9ef731681465b50762d38362524b7f4a2c02c679fd94cc6cff?size=256&d=initials"
              }
              name={user.name}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
