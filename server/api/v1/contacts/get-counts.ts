import { getServerSession, getServerToken } from "#auth";
import { authOptions } from "../../auth/[...]";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  if (!session) {
    return {
      status: 401,
      body: { error: "Unauthorized" },
    };
  }

  const userId = session.user?.id;

  try {
    const [favoritesCount, contactsCount, notesCount] = await Promise.all([
      prisma.contact.count({
        where: {
          userId: userId,
          isFavorite: true,
        },
      }),
      prisma.contact.count({
        where: {
          userId: userId,
        },
      }),
      prisma.contact.count({
        where: {
          userId: userId,
          notes: {
            not: null,
          },
        },
      }),
    ]);

    return {
      status: 200,
      body: { favoritesCount, contactsCount, notesCount },
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
});
