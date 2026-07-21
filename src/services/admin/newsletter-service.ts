import { prisma } from "@/lib/prisma";

export async function getNewsletterSubscribers() {
  return prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: "desc" },
  });
}

export async function getNewsletterStats() {
  const [total, active] = await Promise.all([
    prisma.newsletterSubscriber.count(),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
  ]);
  return { total, active };
}
