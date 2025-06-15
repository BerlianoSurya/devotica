export type User = {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

export type Prayer = {
  id: string;
  title: string;
  content: string;
  category: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

export type UserPrayerLog = {
  id: string;
  user_id: string;
  prayer_id: string;
  prayed_at: string; // YYYY-MM-DD
  created_at: Date | string;
  updated_at: Date | string;
};

export type FavoritePrayer = {
  id: string;
  user_id: string;
  prayer_id: string;
  created_at: Date | string;
  updated_at: Date | string;
};
