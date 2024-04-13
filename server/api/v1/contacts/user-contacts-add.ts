import { getServerSession } from "#auth";
import { authOptions } from "../../auth/[...]";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
//TODO: Find why error does not return as expected
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  const userId = session?.user?.id;

  if (!session || !userId) {
    return {
      status: 401,
      body: { error: "Unauthorized" },
    };
  }

  const contactData = await readBody(event);

  try {
    const existingContact = await prisma.contact.findUnique({
      where: {
        userId_email: {
          userId: userId,
          email: contactData.email,
        },
      },
    });

    if (existingContact) {
      const errorMessage = `A contact with email ${contactData.email} already exists.`;
      return {
        status: 400,
        body: {
          error: errorMessage,
        },
      };
    }

    const newContact = await prisma.contact.create({
      data: {
        userId: userId,
        ...contactData,
      },
    });
    return {
      status: 200,
      body: newContact,
    };
  } catch (error: any) {
    let errorMessage = "There was an error adding the new contact";
  }
});
