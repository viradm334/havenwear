import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/sendResetEmail";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    const findEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (!findEmail) {
      return Response.json({ message: "User not found!" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await prisma.user.update({
      where: {email},
      data: {
        resetToken: hashedToken,
        resetTokenExpiryTime: new Date(Date.now() + 1000 * 60 * 20),
      },
    });

    await sendResetEmail(email, resetToken);

    return Response.json({
      message: "Reset password link sent!",
      success: true,
    });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
