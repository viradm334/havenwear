import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(req){
    const cookiestore = await cookies();
    const token = cookiestore.get("token")?.value;

    if(!token){
        return Response.json({cart: null}, {status: 401})
    }

    try{
        const {payload } = await jwtVerify(token, secret);
        const userId = payload.id;

        const cart = await prisma.cart.findUnique({where: {userId: userId}});

        return Response.json(cart);
    }catch(err){
        return Response.json({ user: null }, { status: 401 });
    }
}