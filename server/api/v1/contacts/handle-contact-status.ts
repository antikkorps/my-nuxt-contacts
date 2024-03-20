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
  const body = await readBody(event);
  const contactId = body?.id;

  if (!contactId) {
    return {
      status: 400,
      body: { error: "Bad Request: Missing contact ID" },
    };
  }

  try {
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });

    if (!contact) {
      return {
        status: 404,
        body: { error: "Not Found: Contact not found" },
      };
    }

    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: { isFavorite: !contact.isFavorite },
    });
    return {
      status: 200,
      body: updatedContact,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
});
