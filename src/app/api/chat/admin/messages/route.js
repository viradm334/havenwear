import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const admin = await prisma.user.findFirst({
      where: { email: "havenwear@gmail.com" },
    });
    const adminId = admin?.id;

    const latestMessages = await prisma.message.findMany({
      where: {
        receiverId: adminId,
        NOT: { senderId: adminId },
      },
      orderBy: {
        created_at: "desc",
      },
      distinct: ["senderId"],
      include: {
        sender: true,
      },
    });

    return Response.json({message: "Successfully fetched all users and messages!", success: true, latestMessages})
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
