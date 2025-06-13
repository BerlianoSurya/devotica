import { Crown, Cross } from "lucide-react";

export interface Prayer {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  icon: any;
  content: string;
  url: string;
}

export const prayers: Prayer[] = [
  {
    id: "rosary",
    title: "The Holy Rosary",
    description:
      "The most beloved prayer to Our Lady, meditating on the mysteries of Christ's life",
    category: "Marian Devotions",
    duration: "20-30 min",
    icon: Crown,
    content:
      "Begin with the Sign of the Cross, then pray the Apostles' Creed, Our Father, three Hail Marys, and Glory Be...",
    url: "/dashboard/prayers/rosary",
  },
  {
    id: "bridget-prayers",
    title: "The Prayers of Saint Bridget",
    description:
      "One year devotion revealed by Jesus to Saint Bridget of Sweden",
    category: "Devotions",
    duration: "15-20 min daily",
    icon: Cross,
    content:
      "O Jesus, now I wish to pray the Fifteen Prayers which You dictated to Saint Bridget...",
    url: "/dashboard/prayers/bridget-prayers",
  },
  {
    id: "three-hail-mary-novena",
    title: "3 Hail Mary Novena",
    description:
      "A powerful daily devotion asking for purity, protection, and perseverance",
    category: "Marian Devotions",
    duration: "2-3 min daily",
    icon: Cross,
    content:
      "O Mary, my Mother, preserve me this day (night) from mortal sin...\n\nHail Mary...\nHail Mary...\nHail Mary...",
    url: "/dashboard/prayers/three-hail-mary-novena",
  },
];

export const categories = [
  "All",
  "Marian Devotions",
  "Novenas",
  "Chaplets",
  "Sacred Heart",
  "Daily Prayers",
  "Lenten Devotions",
  "Litanies",
];
