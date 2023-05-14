import prisma from "prisma/prisma";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";
import { validateUser } from "@/lib/utils";

const regexName = /^[a-zA-Z][a-zA-Z ]*$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export async function POST(
  req: NextRequest & {
    body: { name: string; email: string; password: string };
  }
) {
  try {
    const { name, email, password } = req.body;
    const { valid, message } = validateUser(name, email, password);
    if (!valid) throw { message };
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user
      .create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      })
      .catch((err) => {
        console.error(err);
        return NextResponse.json(
          { message: "This email is already in use" },
          { status: 400 }
        );
      });
    if (!user) {
      throw { meta: { target: "users_email_key" } };
    }
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
