import { getServerSession } from "#auth";
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
  const contactData = await readBody(event);

  try {
    const newContact = await prisma.contact.create({
      data: {
        userId: userId,
        ...contactData,
      },
    });
  } catch (error) {
    return {
      status: 500,
      body: { error: "There is an error adding the new contact" },
    };
  }
});
