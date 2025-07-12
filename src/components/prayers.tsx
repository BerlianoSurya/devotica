"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search, Clock, BookOpen, Church } from "lucide-react";
import { cn } from "@/lib/utils";
import { prayers, categories, type Prayer, idPrayers } from "./prayers-data";
import { useRouter } from "next/navigation";
import { CustomButton } from "./custom-button";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

export default function PrayersPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const isFavoriteEnabled = process.env.NEXT_PUBLIC_FAVORITE_FLAG;
  const router = useRouter();
  const locale = useLocale();
  const a = useTranslations("app");
  const t = useTranslations("prayers");
  const mergedPrayers = locale === "id" ? [...prayers, ...idPrayers] : prayers;

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

  const filteredPrayers = mergedPrayers.filter((prayer) => {
    const matchesCategory =
      selectedCategory === "All" || prayer.category === selectedCategory;
    const matchesSearch =
      prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prayer.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const closeModal = () => {
    setSelectedPrayer(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleStartPrayer = (prayer: Prayer) => {
    return router.push(`/dashboard/prayers/${prayer.id}`);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">
            {a("prayersPageTitle")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {a("prayersPageDescription")}
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={a("searchPrayers")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrayers.map((prayer) => {
          const IconComponent = prayer.icon;
          return (
            <Card
              key={prayer.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-border hover:border-primary/50"
              onClick={() => setSelectedPrayer(prayer)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-card-foreground">
                        {t(`${prayer.id}.title`)}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {prayer.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {prayer.description}
                </CardDescription>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {prayer.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedPrayer && (
        <div
          className={cn(
            "fixed top-16 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center p-4 z-40",
            isCollapsed ? "lg:left-16" : "lg:left-64"
          )}
          onClick={handleBackdropClick}
        >
          <Card
            className="max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <selectedPrayer.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-card-foreground">
                      {t(`${selectedPrayer.id}.title`)}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">
                        {selectedPrayer.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {selectedPrayer.duration}
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground mb-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-card-foreground leading-relaxed whitespace-pre-line">
                    {selectedPrayer.description}
                  </p>
                </div>
              </CardDescription>

              <div className="mt-4 flex gap-2">
                <CustomButton
                  className="flex-1"
                  onClick={() => handleStartPrayer(selectedPrayer)}
                  icon={<BookOpen />}
                  iconSize={25}
                  clickEffect="bounce"
                  hoverEffect="glow"
                >
                  Start Prayer
                </CustomButton>
                {isFavoriteEnabled && (
                  <CustomButton
                    variant="outline"
                    iconSize={20}
                    icon={<Heart />}
                  >
                    Add to Favorites
                  </CustomButton>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredPrayers.length === 0 && (
        <div className="text-center py-12">
          <Church className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            No prayers found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or category filter
          </p>
        </div>
      )}
    </div>
  );
}
