import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return Response.json(
      { message: "Wrong email or password!" },
      { status: 401 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return Response.json(
      { messsage: "Wrong email or password!" },
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT({
    id: user.id,
    role: user.role,
    name: user.name
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  (await cookies()).set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return Response.json({ message: "Login Successful!", success: true, role: user.role });
}
