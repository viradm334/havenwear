import prisma from "./prisma";

export async function makeUniqueProductSlug(baseSlug, currentId = null, maxAttempt = 10){
    for(let attempt = 0; attempt < maxAttempt; attempt++){
        const candidate = attempt === 0? baseSlug : `${baseSlug}-${attempt}`;

        const conflict = await prisma.product.findFirst({
            where: {
                slug: candidate,
                ...(currentId? {NOT : {id: currentId}} : {})
            },
            select: {id: true}
        });

        if(!conflict){
            return candidate;
        };
    }

    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `${baseSlug}-${randomSuffix}`;
}