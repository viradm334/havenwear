import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("havenwear101", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "havenwear@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
      },
      {
        name: "Example User",
        email: "exampleuser@gmail.com",
        password: hashedPassword,
        role: "USER",
      },
    ],
    skipDuplicates: true
  });

  await prisma.category.createMany({
    data: [
      {
        name: "tops",
        slug: "tops",
      },
      {
        name: "bottoms",
        slug: "bottoms",
      },
      {
        name: "accessories",
        slug: "accessories",
      },
      {
        name: "dress",
        slug: "dress",
      },
      {
        name: "outerwear",
        slug: "outerwear",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    console.log("Seeding done");
    await prisma.$disconnect;
  })
  .catch(async (err) => {
    console.error(err.message);
    await prisma.$disconnect;
    process.exit(1);
  });
