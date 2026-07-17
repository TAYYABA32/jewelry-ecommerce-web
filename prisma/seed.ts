import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../src/generated/prisma";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Real, hand-verified Unsplash photos (id -> actual jewelry, checked
// visually — not random stock photos). These are seed/dev placeholders;
// swap for real product photography via the admin upload flow later.
function unsplash(photoId: string) {
  return `https://images.unsplash.com/photo-${photoId}?w=1200&q=80&auto=format&fit=crop`;
}

const CATEGORIES = [
  {
    slug: "rings",
    name: "Rings",
    description: "Engagement, wedding, and statement rings.",
    imageUrl: unsplash("1603561591411-07134e71a2a9"),
    position: 1,
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    description: "Pendants, chains, and tennis necklaces.",
    imageUrl: unsplash("1601121141461-9d6647bca1ed"),
    position: 2,
  },
  {
    slug: "earrings",
    name: "Earrings",
    description: "Studs, hoops, and drop earrings.",
    imageUrl: unsplash("1629224316810-9d8805b95e76"),
    position: 3,
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    description: "Tennis bracelets, bangles, and chains.",
    imageUrl: unsplash("1602173574767-37ac01994b2a"),
    position: 4,
  },
] as const;

const PRODUCTS = [
  {
    slug: "eternal-solitaire-diamond-ring",
    sku: "RNG-001",
    category: "rings",
    images: ["1605100804763-247f67b3557e", "1543294001-f7cd5d7fb516"],
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
    images: ["1605100804567-1ffe942b5cd6", "1598560917807-1bae44bd2be8"],
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
    images: ["1719924998065-0c60e329ef58", "1607703829739-c05b7beddf60"],
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
    images: ["1620656798579-1984d9e87df7", "1722410180687-b05b50922362"],
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
    images: ["1685970731194-e27b477e87ba", "1611583027838-515a1087afdb"],
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
    images: ["1595345705177-ffe090eb0784", "1515562141207-7a88fb7ce338"],
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
    images: ["1693212793204-bcea856c75fe", "1615197419962-90f21da0956d"],
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
    images: ["1535632787350-4e68ef0ac584", "1674329042475-de1a95b4ca62"],
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
    images: ["1638854254875-a2416fe0fec2", "1638854254875-a2416fe0fec2"],
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
    images: ["1633810543462-77c4a3b13f07", "1728646998199-127b357a464d"],
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
    images: ["1721206624492-3d05631471ea", "1689367436442-76c859315008"],
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
    images: ["1679156271456-d6068c543ee7", "1679156271456-d6068c543ee7"],
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
    const { category, images, ...data } = product;
    const categoryId = categoryIdBySlug.get(category);
    if (!categoryId) throw new Error(`Unknown category: ${category}`);

    const record = await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...data, categoryId },
      create: { ...data, categoryId },
    });

    // Replace images every run so corrected/updated photo IDs always win.
    await prisma.productImage.deleteMany({ where: { productId: record.id } });
    await prisma.productImage.createMany({
      data: images.map((photoId, position) => ({
        productId: record.id,
        url: unsplash(photoId),
        altText:
          position === 0 ? product.name : `${product.name} — alternate view`,
        position,
      })),
    });
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
