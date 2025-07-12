import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";
import { getAllPrayers } from "@/lib/coveredprayers";

interface PrayerNavigationProps {
  currentSlug: string;
}

const categoryColors = {
  prayer: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  novena:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  devotion: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rosary: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
};

const categoryIcons = {
  prayer: "🙏",
  novena: "✨",
  devotion: "❤️",
  rosary: "📿",
};

export function PrayerNavigation({ currentSlug }: PrayerNavigationProps) {
  const allPosts = getAllPrayers();
  const currentPost = allPosts.find((post) => post.id === currentSlug);

  return (
    <div className="sticky top-24 space-y-6">
      <div className="text-center space-y-4">
        <Button asChild className="w-full">
          <Link href={`/dashboard/prayers/${currentSlug}`}>
            Start Praying 🙏
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BookOpen className="mr-2 h-5 w-5" />
            Other Prayers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allPosts
              .filter((post) => post.id !== currentSlug)
              .slice(0, 4)
              .map((post) => (
                <Link
                  key={post.id}
                  href={`/prayers/${post.id}`}
                  className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`${categoryColors[post.category]} text-xs`}
                        >
                          {categoryIcons[post.category]} {post.category}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <Link href="/prayers">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                View All Prayers
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {currentPost && (
        <Card className="hidden">
          <CardHeader>
            <CardTitle>Related Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentPost.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
