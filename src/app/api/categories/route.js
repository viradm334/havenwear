import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const categories = await prisma.category.findMany({});

    return Response.json({
      message: "Succesfully retrieved all categories!",
      data: categories,
    });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
