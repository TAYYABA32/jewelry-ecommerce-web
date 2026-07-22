import { prisma } from "@/lib/prisma";
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME } from "@/constants/site";

export const SETTINGS_ID = "singleton";

export async function getStoreSettings() {
  const existing = await prisma.storeSettings.findUnique({
    where: { id: SETTINGS_ID },
  });
  if (existing) return existing;

  return prisma.storeSettings.create({
    data: {
      id: SETTINGS_ID,
      storeName: SITE_NAME,
      supportEmail: CONTACT_EMAIL,
      supportWhatsapp: CONTACT_PHONE,
    },
  });
}
