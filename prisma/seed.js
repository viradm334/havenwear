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
        imageUrl: "/ctg-tops.png"
      },
      {
        name: "bottoms",
        slug: "bottoms",
        imageUrl: "/ctg-bottoms.jpg"
      },
      {
        name: "accessories",
        slug: "accessories",
        imageUrl: "/ctg-accessories.jpg"
      },
      {
        name: "dress",
        slug: "dress",
        imageUrl: "/ctg-dress.jpg"
      },
      {
        name: "outerwear",
        slug: "outerwear",
        imageUrl: "/ctg-outerwear.png"
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
