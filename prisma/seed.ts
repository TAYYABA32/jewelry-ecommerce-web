import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

function image(seed: string) {
  return `https://picsum.photos/seed/${seed}/1000/1200`;
}

const CATEGORIES = [
  {
    slug: "rings",
    name: "Rings",
    description: "Engagement, wedding, and statement rings.",
    imageUrl: image("aurelia-rings"),
    position: 1,
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    description: "Pendants, chains, and tennis necklaces.",
    imageUrl: image("aurelia-necklaces"),
    position: 2,
  },
  {
    slug: "earrings",
    name: "Earrings",
    description: "Studs, hoops, and drop earrings.",
    imageUrl: image("aurelia-earrings"),
    position: 3,
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    description: "Tennis bracelets, bangles, and chains.",
    imageUrl: image("aurelia-bracelets"),
    position: 4,
  },
] as const;

const PRODUCTS = [
  {
    slug: "eternal-solitaire-diamond-ring",
    sku: "RNG-001",
    category: "rings",
    name: "Eternal Solitaire Diamond Ring",
    shortDescription: "A timeless solitaire set in platinum.",
    description:
      "Our signature solitaire, featuring a brilliant-cut diamond set in a six-prong platinum setting. Designed to catch the light from every angle.",
    price: "4200.00",
    discountPrice: "3780.00",
    material: "Platinum",
    stoneType: "Diamond",
    weight: "3.20",
    gender: "WOMEN",
    occasion: "Engagement",
    stockQuantity: 14,
    ratingAverage: "4.90",
    ratingCount: 214,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    slug: "classic-gold-band-ring",
    sku: "RNG-002",
    category: "rings",
    name: "Classic Gold Band Ring",
    shortDescription: "A refined 18K gold wedding band.",
    description:
      "A comfort-fit wedding band, hand-polished in 18K gold. A quiet, everyday classic built to last generations.",
    price: "890.00",
    material: "18K Gold",
    stoneType: null,
    weight: "5.10",
    gender: "UNISEX",
    occasion: "Wedding",
    stockQuantity: 40,
    ratingAverage: "4.70",
    ratingCount: 96,
  },
  {
    slug: "vintage-halo-sapphire-ring",
    sku: "RNG-003",
    category: "rings",
    name: "Vintage Halo Sapphire Ring",
    shortDescription: "A blue sapphire framed in a diamond halo.",
    description:
      "A vintage-inspired halo ring featuring a rich blue sapphire encircled by a double row of pavé diamonds, in warm 18K gold.",
    price: "2650.00",
    material: "18K Gold",
    stoneType: "Sapphire",
    weight: "4.00",
    gender: "WOMEN",
    occasion: "Anniversary",
    stockQuantity: 9,
    ratingAverage: "4.80",
    ratingCount: 58,
    isNewArrival: true,
    isTrending: true,
  },
  {
    slug: "diamond-tennis-necklace",
    sku: "NCK-001",
    category: "necklaces",
    name: "Diamond Tennis Necklace",
    shortDescription: "A continuous line of brilliant diamonds.",
    description:
      "An unbroken line of brilliant-cut diamonds, individually prong-set in platinum for maximum sparkle from every angle.",
    price: "5400.00",
    material: "Platinum",
    stoneType: "Diamond",
    weight: "12.50",
    gender: "WOMEN",
    occasion: "Gift",
    stockQuantity: 6,
    ratingAverage: "4.95",
    ratingCount: 132,
    isBestSeller: true,
  },
  {
    slug: "rose-gold-pendant-necklace",
    sku: "NCK-002",
    category: "necklaces",
    name: "Rose Gold Pendant Necklace",
    shortDescription: "A delicate diamond pendant in rose gold.",
    description:
      "A single brilliant-cut diamond suspended on a fine rose gold chain — designed for everyday wear.",
    price: "1200.00",
    material: "Rose Gold",
    stoneType: "Diamond",
    weight: "2.80",
    gender: "WOMEN",
    occasion: "Everyday",
    stockQuantity: 27,
    ratingAverage: "4.75",
    ratingCount: 189,
    isFeatured: true,
    isNewArrival: true,
  },
  {
    slug: "pearl-strand-necklace",
    sku: "NCK-003",
    category: "necklaces",
    name: "Pearl Strand Necklace",
    shortDescription: "Freshwater pearls on a silver chain.",
    description:
      "A single strand of hand-selected freshwater pearls, finished with a sterling silver clasp.",
    price: "780.00",
    material: "Sterling Silver",
    stoneType: "Pearl",
    weight: "18.00",
    gender: "WOMEN",
    occasion: "Gift",
    stockQuantity: 33,
    ratingAverage: "4.60",
    ratingCount: 77,
    isTrending: true,
  },
  {
    slug: "diamond-stud-earrings",
    sku: "ERG-001",
    category: "earrings",
    name: "Diamond Stud Earrings",
    shortDescription: "Classic brilliant-cut studs.",
    description:
      "Our best-selling stud earrings, featuring brilliant-cut diamonds in a secure four-prong 18K gold setting.",
    price: "1650.00",
    material: "18K Gold",
    stoneType: "Diamond",
    weight: "1.60",
    gender: "WOMEN",
    occasion: "Everyday",
    stockQuantity: 45,
    ratingAverage: "4.90",
    ratingCount: 301,
    isFeatured: true,
    isBestSeller: true,
  },
  {
    slug: "emerald-drop-earrings",
    sku: "ERG-002",
    category: "earrings",
    name: "Emerald Drop Earrings",
    shortDescription: "Colombian emeralds in a modern drop.",
    description:
      "Vivid emeralds suspended from diamond-set platinum drops — a statement piece for special occasions.",
    price: "3100.00",
    material: "Platinum",
    stoneType: "Emerald",
    weight: "4.40",
    gender: "WOMEN",
    occasion: "Anniversary",
    stockQuantity: 8,
    ratingAverage: "4.85",
    ratingCount: 41,
    isNewArrival: true,
  },
  {
    slug: "gold-hoop-earrings",
    sku: "ERG-003",
    category: "earrings",
    name: "Gold Hoop Earrings",
    shortDescription: "Polished 18K gold hoops.",
    description:
      "Lightweight, hand-polished 18K gold hoops designed for everyday elegance.",
    price: "540.00",
    material: "18K Gold",
    stoneType: null,
    weight: "3.10",
    gender: "WOMEN",
    occasion: "Everyday",
    stockQuantity: 60,
    ratingAverage: "4.65",
    ratingCount: 154,
    isTrending: true,
  },
  {
    slug: "diamond-tennis-bracelet",
    sku: "BRC-001",
    category: "bracelets",
    name: "Diamond Tennis Bracelet",
    shortDescription: "A continuous line of diamonds.",
    description:
      "A classic tennis bracelet featuring a continuous line of brilliant-cut diamonds set in platinum, with a secure box clasp.",
    price: "3900.00",
    material: "Platinum",
    stoneType: "Diamond",
    weight: "8.20",
    gender: "WOMEN",
    occasion: "Gift",
    stockQuantity: 11,
    ratingAverage: "4.90",
    ratingCount: 88,
    isBestSeller: true,
    isTrending: true,
  },
  {
    slug: "rose-gold-chain-bracelet",
    sku: "BRC-002",
    category: "bracelets",
    name: "Rose Gold Chain Bracelet",
    shortDescription: "A fine link chain in rose gold.",
    description:
      "A fine curb-chain bracelet in warm rose gold — equally at home stacked or worn alone.",
    price: "620.00",
    material: "Rose Gold",
    stoneType: null,
    weight: "4.90",
    gender: "UNISEX",
    occasion: "Everyday",
    stockQuantity: 38,
    ratingAverage: "4.55",
    ratingCount: 63,
    isFeatured: true,
  },
  {
    slug: "sapphire-bangle",
    sku: "BRC-003",
    category: "bracelets",
    name: "Sapphire Bangle",
    shortDescription: "A hinged bangle set with sapphires.",
    description:
      "A hinged 18K gold bangle set with a graduated row of blue sapphires, finished with a hidden safety clasp.",
    price: "2200.00",
    material: "18K Gold",
    stoneType: "Sapphire",
    weight: "14.00",
    gender: "WOMEN",
    occasion: "Anniversary",
    stockQuantity: 7,
    ratingAverage: "4.80",
    ratingCount: 29,
    isNewArrival: true,
  },
] as const;

async function main() {
  console.log("Seeding categories...");
  const categoryIdBySlug = new Map<string, string>();

  for (const category of CATEGORIES) {
    const record = await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    categoryIdBySlug.set(category.slug, record.id);
  }

  console.log("Seeding products...");
  for (const product of PRODUCTS) {
    const { category, ...data } = product;
    const categoryId = categoryIdBySlug.get(category);
    if (!categoryId) throw new Error(`Unknown category: ${category}`);

    const record = await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...data, categoryId },
      create: { ...data, categoryId },
    });

    const existingImages = await prisma.productImage.count({
      where: { productId: record.id },
    });
    if (existingImages === 0) {
      await prisma.productImage.createMany({
        data: [
          {
            productId: record.id,
            url: image(product.slug),
            altText: product.name,
            position: 0,
          },
          {
            productId: record.id,
            url: image(`${product.slug}-alt`),
            altText: `${product.name} — alternate view`,
            position: 1,
          },
        ],
      });
    }
  }

  console.log(
    `Seeded ${CATEGORIES.length} categories and ${PRODUCTS.length} products.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
