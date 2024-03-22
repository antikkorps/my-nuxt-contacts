import { getServerSession } from "#auth";
import { authOptions } from "../../auth/[...]";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  const contactId = getRouterParam(event, "id");

  return `hello ${contactId} !`;

  // if (!session) {
  //   return {
  //     status: 401,
  //     body: { error: "Unauthorized" },
  //   };
  // }

  // const userId = session.user?.id;

  // const { id } = event.query;

  // try {
  //   const contact = await prisma.contact.findUnique({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!contact || contact.userId !== userId) {
  //     return {
  //       status: 404,
  //       body: { error: "Contact not found" },
  //     };
  //   }

  //   return {
  //     status: 200,
  //     body: {
  //       contact: {
  //         id: contact.id,
  //         image: contact.image,
  //         firstName: contact.firstName,
  //         lastName: contact.lastName,
  //         email: contact.email,
  //         phone: contact.phone,
  //         linkedin: contact.linkedin,
  //         facebook: contact.facebook,
  //         instagram: contact.instagram,
  //         twitter: contact.twitter,
  //         jobTitle: contact.jobTitle,
  //         company: contact.company,
  //         notes: contact.notes,
  //       },
  //     },
  //   };
  // } catch (error) {
  //   return {
  //     status: 500,
  //     body: { error: "Internal server error" },
  //   };
  // }
});
