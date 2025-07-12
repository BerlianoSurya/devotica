import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Profile01Props {
  name: string;
  avatar: string;
}

const defaultProfile = {
  name: "User",
  avatar:
    "https://0.gravatar.com/avatar/0958046148db4f9ef731681465b50762d38362524b7f4a2c02c679fd94cc6cff?size=256&d=initials",
} satisfies Required<Profile01Props>;

export default function Profile01({
  name = defaultProfile.name,
  avatar = defaultProfile.avatar,
}: Partial<Profile01Props> = defaultProfile) {
  const isFavoriteEnabled = process.env.NEXT_PUBLIC_FAVORITE_FLAG;
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-border">
        <div className="relative px-6 py-6">
          <div className="flex items-center gap-4 ">
            <div className="relative shrink-0">
              <Image
                src={avatar || "/placeholder.svg"}
                alt={name}
                width={72}
                height={72}
                className="rounded-full ring-4 ring-background object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-popover-foreground">
                {name}
              </h2>
            </div>
          </div>
          {isFavoriteEnabled && (
            <Link
              href="#"
              className="flex items-center justify-between p-2 
                                hover:bg-accent
                                rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium text-popover-foreground">
                  Favorites
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
