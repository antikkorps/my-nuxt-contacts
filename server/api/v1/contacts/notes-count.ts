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
    const notes = await prisma.contact.findMany({
      where: {
        userId: userId,
        notes: {
          not: null,
        },
      },
    });

    return {
      status: 200,
      body: { count: notes.length },
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
});
