import prisma from "./prisma";

export async function getProductByIdOrSlug(identifier) {
  let product = await prisma.product.findUnique({
    where: { id: identifier },
    include: {
      productSizes: {
        select: {
          id: true,
          name: true,
          stock: true,
        },
      },
      productPhotos: {
        select: {
          imageUrl: true,
          thumbnail: true,
        },
      },
    },
  });

  if (!product) {
    product = await prisma.product.findUnique({
      where: { slug: identifier },
      include: {
        productSizes: {
          select: {
            id: true,
            name: true,
            stock: true,
          },
        },
        productPhotos: {
          select: {
            imageUrl: true,
            thumbnail: true,
          },
        },
      },
    });
  }

  return product;
}
