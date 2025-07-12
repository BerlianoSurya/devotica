import { Crown, Cross } from "lucide-react";

export interface Prayer {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    id: "st-bridget-15-prayers",
    title: "The 15 Prayers of Saint Bridget of Sweden",
    description:
      "One year devotion revealed by Jesus to Saint Bridget of Sweden",
    category: "Devotions",
    duration: "25-35 min",
    icon: Cross,
    content:
      "O Jesus, now I wish to pray the Fifteen Prayers which You dictated to Saint Bridget...",
    url: "/dashboard/prayers/st-bridget-15-prayers",
  },
  {
    id: "three-hail-mary-novena",
    title: "3 Hail Mary Novena",
    description:
      "A powerful daily devotion asking for purity, protection, and perseverance",
    category: "Marian Devotions",
    duration: "2-3 min",
    icon: Crown,
    content:
      "O Mary, my Mother, preserve me this day (night) from mortal sin...\n\nHail Mary...\nHail Mary...\nHail Mary...",
    url: "/dashboard/prayers/three-hail-mary-novena",
  },
  {
    id: "sacred-heart-of-jesus",
    title: "The Sacred Heart of Jesus",
    description:
      "This prayer to the Sacred Heart of Jesus is a powerful way to reflect and deepen your Catholic faith.",
    category: "Sacred Heart",
    duration: "2-3 min",
    icon: Cross,
    content: "",
    url: "/dashboard/prayers/sacred-heart-of-jesus",
  },
];

export const idPrayers: Prayer[] = [
  {
    id: "novena-kanak-kanak-yesus",
    title: "Novena Kanak Kanak Yesus",
    description:
      "Doa Novena Kanak Kanak Yesus untuk menyambut kelahiran-Nya di hati dan hidup kita yang telah mengubah dan membawa kesejatian dalam hidup kita. Novena Kanak-Kanak Yesus penuh kuasa dalam keperluan yang mendesak. \n\nNovena Kanak-Kanak Yesus didoakan 9 hari berturut-turut dan dapat didoakan kapan saja. Tanggal teristimewa untuk menderaskan Novena Kanak-Kanak Yesus adalah pada tanggal 17-25 Desember. Tekunlah berdoa, berserahlah kepada-Nya, andalkan, yakin, percaya, tiada yg mustahil bagi Yesus, dan semua pastilah akan menerima keajaiban dan mukjizat-Nya dalam hidup dan keluarga Anda..",
    category: "Novenas",
    duration: "2-3 min",
    icon: Cross,
    content: "",
    url: "/dashboard/prayers/novena-kanak-kanak-yesus",
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
