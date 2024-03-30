import { getServerSession } from "#auth";
import { authOptions } from "../../auth/[...]";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  const contactId = getRouterParam(event, "id");

  if (!session) {
    return {
      status: 401,
      body: { error: "Unauthorized" },
    };
  }

  const userId = session?.user?.id;

  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
        user: {
          id: userId,
        },
      },
    });

    if (!contact || contact.userId !== userId) {
      return {
        status: 404,
        body: { error: "Contact not found" },
      };
    }
    if (contact.userId !== userId) {
      return {
        status: 403,
        body: { error: "Forbidden" },
      };
    }

    if (event.method === "DELETE") {
      await prisma.contact.delete({
        where: {
          id: contactId,
        },
      });

      return {
        status: 200,
        body: { message: "Contact deleted successfully" },
      };
    }

    return {
      status: 200,
      body: {
        contact: {
          id: contact.id,
          image: contact.image,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
          mobile: contact.mobile,
          linkedin: contact.linkedin,
          facebook: contact.facebook,
          instagram: contact.instagram,
          twitter: contact.twitter,
          github: contact.github,
          jobTitle: contact.jobTitle,
          company: contact.company,
          notes: contact.notes,
          isFavorite: contact.isFavorite,
        },
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
});
