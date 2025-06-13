"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import Link from "next/link";

interface NavigationLinkProps extends ComponentProps<typeof Link> {
  icon: React.ElementType;
  children: ReactNode;
}

export default function NavigationLink({
  href,
  icon: Icon,
  children,
  ...rest
}: NavigationLinkProps) {
  const currentPath = usePathname();

  const cleanPath = (path: string) => {
    const parts = path.split("/");
    if (parts.length > 2 && parts[1]?.length === 2) {
      return "/" + parts.slice(2).join("/");
    }
    return path;
  };

  const normalizedCurrent = cleanPath(currentPath);
  const normalizedHref = cleanPath(href);

  const isActive = normalizedCurrent === normalizedHref;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
      {...rest}
    >
      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
      {children}
    </Link>
  );
}
