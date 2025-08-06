import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET() {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.json({ user: payload });
  } catch (e) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}