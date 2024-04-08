import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await readBody(event);
  const hashedPassword = await bcrypt.hash(user.password, 10);
  try {
    const newUser = await prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
    return {
      status: 200,
      body: user,
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: "There was an error while creating the user" },
    };
  }
});
