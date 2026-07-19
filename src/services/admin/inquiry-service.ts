import { prisma } from "@/lib/prisma";

export function getAdminInquiries() {
  return prisma.consultationRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
}
