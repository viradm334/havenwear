import prisma from "./prisma";

export async function getProductByIdOrSlug(identifier) {
  let product = await prisma.product.findMany({
    where: { id: identifier },
  });

  if (product.length === 0) {
    product = await prisma.product.findMany({ where: { slug: identifier } });
  }

  return product;
}
