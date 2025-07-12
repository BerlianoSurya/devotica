export interface Prayer {
  id: string;
  title: string;
  description: string;
  body: string;
  history?: string;
  keywords: string[];
  category: "prayer" | "novena" | "devotion" | "rosary";
}

export const prayers: Prayer[] = [
  {
    id: "rosary",
    title: "The Holy Rosary: Complete Guide to Catholic Prayer",
    description:
      "Learn how to pray the Holy Rosary, its mysteries, benefits, and promises. Complete guide to this powerful Catholic devotion with step-by-step instructions.",
    body: ``,
    history: "",
    keywords: [
      "holy rosary",
      "catholic prayer",
      "rosary mysteries",
      "marian devotion",
      "rosary prayers",
      "catholic rosary",
      "how to pray rosary",
      "rosary guide",
    ],
    category: "rosary",
  },
  {
    id: "st-bridget-15-prayers",
    title: "15 Prayers of St. Bridget of Sweden: Powerful Catholic Devotion",
    description:
      "Discover the 15 Prayers of St. Bridget of Sweden, their promises, and spiritual benefits. Complete guide to this powerful Catholic devotion for spiritual growth.",
    body: `
# The 15 Prayers of St. Bridget of Sweden

The 15 Prayers of St. Bridget of Sweden are among the most powerful and beloved devotions in Catholic tradition. These prayers were revealed to St. Bridget by Our Lord Jesus Christ Himself, making them a treasured spiritual practice for Catholics worldwide.

## Who Was St. Bridget of Sweden?

St. Bridget of Sweden (1303-1373) was a mystic, pilgrim, and founder of the Bridgettines religious order. She received numerous visions and revelations from Jesus Christ and the Blessed Virgin Mary. She was canonized in 1391 and is the patron saint of Europe.

## The Origin of the 15 Prayers

According to tradition, Our Lord Jesus Christ appeared to St. Bridget and taught her these 15 prayers. He promised that whoever would pray these prayers daily for a whole year would receive extraordinary graces and indulgences.

## Historical Background

These prayers were revealed to St. Bridget of Sweden (1303-1373) by Our Lord Jesus Christ during her mystical experiences. St. Bridget was a remarkable woman who, after the death of her husband, dedicated her life entirely to God.

She founded the Bridgettine Order and received numerous revelations that were later compiled into the "Revelations of St. Bridget." The 15 prayers form part of these divine communications and have been treasured by the Catholic Church for over 600 years.

St. Bridget was canonized in 1391 by Pope Boniface IX, and in 1999, Pope John Paul II declared her one of the patron saints of Europe, alongside St. Catherine of Siena and St. Teresa Benedicta of the Cross.

## The 15 Promises of Our Lord

Jesus Christ made these promises to St. Bridget for those who pray the 15 prayers daily for one year:

1. **I will deliver 15 souls of his lineage from Purgatory.**

2. **I will preserve 15 souls of his lineage in grace.**

3. **I will convert 15 sinners of his lineage.**

4. **The person who prays these prayers will attain the first degree of perfection.**

5. **Fifteen days before his death I will give him My precious Body in order that he may escape eternal starvation.**

6. **Fifteen days before his death he will drink My precious Blood so that he may not thirst eternally.**

7. **Fifteen days before his death he will feel a deep contrition for all his sins and will have perfect knowledge of them.**

8. **I will place the sign of My victorious Cross before him for his help and defense against the attacks of his enemies.**

9. **Before his death I Myself, his Mother, will come to console him.**

10. **I will graciously receive his soul and will lead it into eternal joys.**

11. **And having led it there I will give him a special draught from the fountain of My Divinity, something I will not do for those who have not recited these Prayers.**

12. **Let it be known that whoever may have been living in the state of mortal sin for thirty years, but who will recite devoutly, or have the intention to recite these prayers, the Lord will forgive him all his sins.**

13. **I will protect him from strong temptations.**

14. **I will preserve and guard his five senses.**

15. **I will preserve him from a sudden death.**

## Spiritual Significance

The 15 Prayers of St. Bridget focus intensely on the Passion of Our Lord Jesus Christ. Each prayer meditates on different aspects of Christ's suffering, from His agony in the garden to His death on the cross. This devotion is particularly powerful for:

- Deep meditation on Christ's Passion
- Increased devotion and love for Jesus
- Spiritual protection and strength
- Preparation for a holy death
- Growth in virtue and holiness
- Powerful intercession for souls in purgatory
    `,
    history:
      "These prayers were revealed to St. Bridget of Sweden (1303-1373) by Our Lord Jesus Christ. St. Bridget was a mystic and founder of the Bridgettines religious order, canonized in 1391.",
    keywords: [
      "st bridget prayers",
      "15 prayers st bridget",
      "catholic devotion",
      "bridget of sweden",
      "passion prayers",
      "catholic prayers",
      "mystical prayers",
    ],
    category: "prayer",
  },
  {
    id: "sacred-heart-of-jesus",
    title: "Sacred Heart of Jesus: Complete Guide to Catholic Devotion",
    description:
      "Learn about the Sacred Heart of Jesus devotion, its history, promises, and prayers. Complete guide to this powerful Catholic practice for spiritual growth.",
    body: `
# The Sacred Heart of Jesus: A Complete Guide

The devotion to the Sacred Heart of Jesus is one of the most beloved and widespread devotions in the Catholic Church. This beautiful practice focuses on the infinite love of Jesus Christ for humanity, symbolized by His Sacred Heart.

## What is the Sacred Heart Devotion?

The Sacred Heart devotion is the veneration of the physical heart of Jesus Christ as the symbol of His divine love for humanity. It represents Christ's love, compassion, and mercy for all people, especially sinners.

The devotion encompasses both the physical heart of Jesus and what it represents: His boundless love for mankind. Catholics honor the Sacred Heart through prayers, consecrations, and the practice of the First Friday devotions.

## Historical Background

The devotion to the Sacred Heart has ancient roots but was particularly promoted through the visions of St. Margaret Mary Alacoque (1647-1690), a French Visitation nun. Between 1673 and 1675, Jesus appeared to her in a series of visions and revealed the devotion, making specific promises to those who would honor His Sacred Heart.

### The Four Great Apparitions

1. **First Apparition (December 27, 1673)**: Jesus invited St. Margaret Mary to rest her head on His Heart and revealed His love for humanity.

2. **Second Apparition (Probably in 1674)**: Jesus showed her His Heart surrounded by thorns, representing the ingratitude of men.

3. **Third Apparition (Probably in 1675)**: Jesus revealed the devotion of the First Fridays and made the Great Promise.

4. **Fourth Apparition (June 16, 1675)**: Jesus requested that a feast be established in honor of His Sacred Heart.

The devotion was later promoted by St. Claude de la Colombière, St. Margaret Mary's spiritual director, and was officially approved by the Church. Pope Pius IX extended the feast to the universal Church in 1856.

## The 12 Promises of the Sacred Heart

Jesus made twelve specific promises to St. Margaret Mary Alacoque for those devoted to His Sacred Heart:

1. **I will give them all the graces necessary in their state of life.**

2. **I will establish peace in their homes.**

3. **I will comfort them in all their afflictions.**

4. **I will be their secure refuge during life, and above all, in death.**

5. **I will bestow abundant blessings upon all their undertakings.**

6. **Sinners will find in My Heart the source and infinite ocean of mercy.**

7. **Lukewarm souls shall become fervent.**

8. **Fervent souls shall quickly mount to high perfection.**

9. **I will bless every place in which an image of My Heart is exposed and honored.**

10. **I will give to priests the gift of touching the most hardened hearts.**

11. **Those who shall promote this devotion shall have their names written in My Heart.**

12. **I promise you in the excessive mercy of My Heart that My all-powerful love will grant to all those who receive Holy Communion on the First Fridays in nine consecutive months the grace of final perseverance; they shall not die in My disgrace, nor without receiving their sacraments. My divine Heart shall be their safe refuge in this last moment.**

## The Great Promise

The most famous promise of the Sacred Heart is known as the "Great Promise" (Promise #12):

*"I promise you in the excessive mercy of My Heart that My all-powerful love will grant to all those who receive Holy Communion on the First Fridays in nine consecutive months the grace of final perseverance; they shall not die in My disgrace, nor without receiving their sacraments. My divine Heart shall be their safe refuge in this last moment."*

## First Friday Devotion

The First Friday devotion consists of:
- Receiving Holy Communion on nine consecutive First Fridays
- Being in a state of grace
- Having the intention of honoring the Sacred Heart
- Making reparation for sins

## Modern Relevance

The Sacred Heart devotion remains highly relevant today as it:
- Emphasizes God's infinite love and mercy
- Provides comfort in times of trial
- Encourages reparation for sins
- Promotes family consecration
- Offers hope for salvation
- Strengthens faith and devotion
    `,
    history:
      "The devotion was revealed to St. Margaret Mary Alacoque (1647-1690) through visions of Jesus Christ between 1673-1675. It was later promoted by St. Claude de la Colombière and officially approved by the Church.",
    keywords: [
      "sacred heart jesus",
      "sacred heart devotion",
      "first friday",
      "margaret mary alacoque",
      "catholic devotion",
      "sacred heart promises",
      "jesus heart",
    ],
    category: "devotion",
  },
  {
    id: "three-hail-mary-novena",
    title: "Three Hail Mary Novena: Powerful Catholic Prayer for Urgent Needs",
    description:
      "Learn about the Three Hail Mary Novena, a powerful Catholic prayer for urgent needs. Discover its history, promises, and how to pray this effective devotion.",
    body: `
# The Three Hail Mary Novena: A Powerful Prayer for Urgent Needs

The Three Hail Mary Novena is one of the most beloved and effective short novenas in Catholic tradition. This simple yet powerful prayer has brought countless miracles and answered prayers to those who practice it with faith and devotion.

## What is the Three Hail Mary Novena?

The Three Hail Mary Novena is a brief but intense prayer consisting of three Hail Marys said for nine consecutive days, along with a specific prayer for urgent needs. It is particularly known for its effectiveness in desperate situations and urgent requests.

This devotion is based on the Catholic belief in the powerful intercession of the Blessed Virgin Mary and her maternal care for all her spiritual children, especially in times of great need.

## Origin and Historical Background

This devotion has its roots in the deep Catholic tradition of seeking the intercession of the Blessed Virgin Mary in times of need. While the exact origin is not definitively documented, it has been practiced by Catholics for centuries and has been endorsed by many saints and spiritual directors.

The novena is based on the belief in Mary's powerful intercession and her maternal care for all her children, especially in their most desperate moments. The practice draws from the traditional Catholic understanding of Mary as the "Mediatrix of All Graces" and "Our Lady of Perpetual Help."

### Traditional Roots

The devotion finds its foundation in several key Catholic teachings:

- **Mary's Role as Intercessor**: From the Wedding at Cana, where Mary interceded for the couple's need
- **The Memorare Prayer**: "Never was it known that anyone who fled to thy protection... was left unaided"
- **Marian Apparitions**: Various apparitions where Mary promised to help those who call upon her
- **Saints' Testimonies**: Numerous saints have testified to Mary's quick response to urgent prayers

## When to Use This Novena

The Three Hail Mary Novena is particularly effective for:

- **Urgent financial needs** - When facing immediate financial crises
- **Health emergencies** - For sudden illness or medical concerns
- **Family crises** - During times of family discord or emergency
- **Job-related problems** - When facing unemployment or workplace issues
- **Relationship difficulties** - For healing broken relationships
- **Legal matters** - When facing court cases or legal troubles
- **Spiritual struggles** - During times of spiritual dryness or temptation
- **Any desperate situation** requiring immediate divine intervention

## Spiritual Benefits and Testimonies

Throughout the centuries, countless Catholics have reported miraculous answers to their prayers through this novena:

### Documented Benefits
- **Financial help** arriving at the last moment
- **Healing from serious illnesses** when doctors had given up hope
- **Resolution of family conflicts** that seemed impossible to solve
- **Finding employment** during difficult economic times
- **Protection from danger** in life-threatening situations
- **Conversion of loved ones** who had been away from the faith
- **Peace in troubled relationships** and marriages

### Spiritual Growth
The novena also provides:
- **Immediate peace** in times of anxiety and stress
- **Strengthened faith** and trust in God's providence
- **Deepened devotion** to the Blessed Virgin Mary
- **Spiritual comfort** during trials and tribulations
- **Increased hope** in seemingly hopeless situations

## The Role of Mary as Intercessor

The effectiveness of this novena is rooted in Catholic teaching about Mary's role as:

### Mother of God
- Her unique relationship with Jesus Christ
- Her special place in salvation history
- Her continued maternal care for all Christians

### Powerful Intercessor
- Her prayers are always heard by Jesus
- Her compassion for human suffering
- Her desire to help her spiritual children

### Model of Faith
- Her perfect "yes" to God's will
- Her trust in divine providence
- Her example of prayer and devotion
    `,
    history:
      "This novena has been practiced by Catholics for centuries, rooted in the tradition of seeking Mary's intercession in urgent needs. It has been endorsed by many saints and spiritual directors throughout Church history.",
    keywords: [
      "three hail mary novena",
      "urgent prayer",
      "mary intercession",
      "catholic novena",
      "desperate prayer",
      "marian devotion",
      "emergency prayer",
    ],
    category: "novena",
  },
];

export const idPrayers: Prayer[] = [
  {
    id: "novena-kanak-kanak-yesus",
    title: "Novena Kanak Kanak Yesus",
    description: "",
    body: ``,
    history: "",
    keywords: [
      "holy rosary",
      "catholic prayer",
      "rosary mysteries",
      "marian devotion",
      "rosary prayers",
      "catholic rosary",
      "how to pray rosary",
      "rosary guide",
    ],
    category: "prayer",
  },
];

export function getPrayerData(id: string): Prayer | undefined {
  return [...prayers, ...idPrayers].find((post) => post.id === id);
}

export function getAllPrayers(): Prayer[] {
  return prayers.sort((a, b) => a.title.localeCompare(b.title));
}

export function getAllIdPrayers(): Prayer[] {
  return idPrayers.sort((a, b) => a.title.localeCompare(b.title));
}

export function getPrayersByCategory(category: Prayer["category"]): Prayer[] {
  return prayers.filter((post) => post.category === category);
}
