import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

const prisma = new PrismaClient()

async function seed() {
  try {
    const password = process.env.USERS_SEED_PASSWORD
    if (!password) {
      throw new Error("USER_PASSWORD is not defined")
    }
    // Create users
    const user1 = await prisma.user.create({
      data: {
        email: "user1@example.com",
        password: await bcrypt.hash(password, 10),
      },
    })

    const user2 = await prisma.user.create({
      data: {
        email: "user2@example.com",
        password: await bcrypt.hash(password, 10),
      },
    })

    // Create contacts
    await prisma.contact.createMany({
      data: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          userId: user1.id,
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          userId: user2.id,
        },
        // Add more contacts here
      ],
    })

    console.log("Seed data created successfully!")
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
