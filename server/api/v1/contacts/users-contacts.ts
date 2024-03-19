import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler((event) => {
  const contactCount = await prisma.contact.count({
    where: {
      userId: userId,
    },
  })
  return {
    contactCount: contactCount,
  }
})
