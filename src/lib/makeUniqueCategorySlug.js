import prisma from "./prisma";

export async function makeUniqueCategorySlug(baseSlug, currentId){
    let slug = baseSlug;
    let attempt = 0;
  
    while (true) {
      const conflict = await prisma.category.findFirst({
        where: {
          slug,
          NOT: { id: currentId },
        },
        select: { id: true },
      });
  
      if (!conflict) {
        return slug;
      }
  
      attempt += 1;
      slug = `${baseSlug}-${attempt}`;
    }
}