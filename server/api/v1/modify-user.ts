import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

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

  const userToBeModified = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (userToBeModified?.id != userId) {
    return {
      status: 403,
      body: { error: "Forbidden" },
    };
  }

  try {
    const userUpdates = await readBody(event);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userUpdates,
    });

    return {
      status: 200,
      body: updatedUser,
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
});
