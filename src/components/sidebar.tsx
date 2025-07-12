"use client";

import type React from "react";
import { Menu, Church, ChevronDown } from "lucide-react";
import { Home } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { prayers, idPrayers } from "./prayers-data";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { useLocale, useTranslations } from "next-intl";

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrayersExpanded, setIsPrayersExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("prayers");

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }
  const mergedPrayers = locale === "id" ? [...prayers, ...idPrayers] : prayers;
  function NavItem({
    href,
    icon: Icon,
    children,
    hasSubmenu = false,
    isExpanded = false,
    onToggle,
    onClick,
  }: {
    href: string;
    icon: any;
    children: React.ReactNode;
    hasSubmenu?: boolean;
    isExpanded?: boolean;
    onToggle?: () => void;
    onClick?: () => void;
  }) {
    const isActive = pathname === href;

    if (hasSubmenu) {
      return (
        <div>
          <div className="flex items-center">
            <Link
              href={href}
              onClick={(e) => {
                handleNavigation();
                onClick?.();
              }}
              className={cn(
                "flex items-center flex-1 rounded-md transition-colors",
                isCollapsed ? "px-0 py-2 justify-center" : "px-3 py-2 text-sm",
                isActive ||
                  (hasSubmenu &&
                    mergedPrayers.some((prayer) => pathname === prayer.url))
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isCollapsed ? "mr-0" : "mr-3"
                )}
              />
              {!isCollapsed && <span>{children}</span>}
            </Link>
            {!isCollapsed && (
              <button
                onClick={onToggle}
                className={cn(
                  "p-1 rounded transition-colors ml-1",
                  "text-primary hover:text-card-foreground hover:bg-accent"
                )}
              >
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
            )}
          </div>
          {!isCollapsed && isExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              {mergedPrayers.map((prayer) => {
                const isSubActive = pathname === prayer.url;
                return (
                  <Link
                    key={prayer.id}
                    href={prayer.url}
                    onClick={handleNavigation}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                      isSubActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <prayer.icon className="h-3 w-3 mr-3 flex-shrink-0" />
                    <span className="text-xs">{t(`${prayer.id}.title`)}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={cn(
          "flex items-center rounded-md transition-colors",
          isCollapsed ? "px-0 py-2 justify-center" : "px-3 py-2 text-sm",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        <Icon
          className={cn("h-4 w-4 flex-shrink-0", isCollapsed ? "mr-0" : "mr-3")}
        />
        {!isCollapsed && children}
      </Link>
    );
  }

  const handlePrayersClick = () => {
    router.push("/dashboard/prayers");
  };

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-background shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>
      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-[70] bg-background transform transition-all duration-200 ease-in-out border-r border-border",
          "lg:translate-x-0 lg:static",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          "w-64"
        )}
      >
        <div className="h-full flex flex-col">
          <div
            className={cn(
              "h-16 border-b border-border flex items-center",
              isCollapsed ? "justify-center px-2" : "justify-center px-6"
            )}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Catholic Prayers"
                width={isCollapsed ? 32 : 40}
                height={isCollapsed ? 32 : 40}
                className="flex-shrink-0"
              />
              {!isCollapsed && (
                <span className="text-xl font-bold text-primary">Devotica</span>
              )}
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className={cn("space-y-6", isCollapsed && "space-y-2")}>
              <div>
                <div className={cn("space-y-1", isCollapsed && "space-y-2")}>
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                </div>
                <div className={cn("space-y-1", isCollapsed && "space-y-2")}>
                  <NavItem
                    href="/dashboard/prayers"
                    icon={Church}
                    hasSubmenu={true}
                    isExpanded={isPrayersExpanded}
                    onToggle={() => setIsPrayersExpanded(!isPrayersExpanded)}
                    onClick={handlePrayersClick}
                  >
                    Prayers
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-border">
            <div className={cn("space-y-6", isCollapsed && "space-y-2")}>
              <div className={cn("space-y-1", isCollapsed && "space-y-2")}>
                <LogoutButton isCollapsed={isCollapsed} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
