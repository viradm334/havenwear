import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
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
    skipDuplicates: true
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
