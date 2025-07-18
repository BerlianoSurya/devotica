"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CustomButton } from "./custom-button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "./locale-switcher";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu-container") &&
        !target.closest(".menu-button")
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <CustomButton
          variant="ghost"
          className="flex gap-2 items-center text-primary hover:bg-transparent"
          hoverEffect="scale"
        >
          <Image
            src="/logo.png"
            alt="Devotica Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-bold text-xl">Devotica</span>
        </CustomButton>

        <div className="flex-1 items-center justify-end space-x-4 hidden md:flex">
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                path === "/" && "underline underline-offset-4 decoration-2"
              )}
            >
              Home
            </Link>
            <Link
              href="/prayers"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                path === "/prayers" &&
                  "underline underline-offset-4 decoration-2"
              )}
            >
              Prayers
            </Link>
            <LocaleSwitcher />
            <ThemeToggle />
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>

        <div className="flex md:hidden flex-1 justify-end">
          <div className="flex items-center space-x-2">
            <LocaleSwitcher />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 p-0 menu-button"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-background/80 backdrop-blur-sm" />
          <div className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-l bg-background p-6 shadow-lg mobile-menu-container">
            <nav className="flex flex-col space-y-6 justify-center items-center">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  path === "/" && "text-primary underline underline-offset-4"
                )}
              >
                Home
              </Link>
              <Link
                href="/prayers"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  path === "/prayers" &&
                    "text-primary underline underline-offset-4"
                )}
              >
                Prayers
              </Link>
              <Button className="w-full" asChild onClick={closeMenu}>
                <Link href="/login">Sign In</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
