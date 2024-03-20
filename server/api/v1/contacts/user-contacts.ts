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

  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      status: 200,
      body: {
        contacts: contacts.map((contact) => ({
          id: contact.id,
          image: contact.image,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          isFavorite: contact.isFavorite,
          phone: contact.phone,
          linkedin: contact.linkedin,
          facebook: contact.facebook,
          instagram: contact.instagram,
          twitter: contact.twitter,
          jobTitle: contact.jobTitle,
          company: contact.company,
          notes: contact.notes,
        })),
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
});
