import prisma from "prisma/prisma";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";
import { userSchemaCreate } from "@/lib/zod";

export async function POST(req: NextRequest) {
  try {
    const validatedBody = userSchemaCreate.parse(req.body);
    console.log(validatedBody);
    const { name, email, password } = validatedBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    if (!user) throw { message: "This email is already in use" };
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
