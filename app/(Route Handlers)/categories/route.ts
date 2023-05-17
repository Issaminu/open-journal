import { CustomError, isCustomError } from "@/lib/utils";
import { categorySchemaUpdate } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const takeParam = searchParams.get("take");
    const skipParam = searchParams.get("skip");
    if (!takeParam || (skipParam && parseInt(skipParam) < 0)) {
      return NextResponse.error();
    }
    const take = parseInt(takeParam);
    const skip = skipParam ? parseInt(skipParam) + 1 : 0;
    const categories = await prisma.category.findMany({
      where: { id: { gte: skip } },
      take: take,
    });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const validatedBody = categorySchemaUpdate.parse(req.body);
    const { name } = validatedBody;
    const categories = await prisma.category.findMany({
      where: {
        authorId: 0,
      },
    });
    if (categories.some((category) => category.name === name)) {
      throw CustomError(`The "${name}" category already exists`, 400);
    }
    const category = await prisma.category.create({
      data: {
        name,
        authorId: 0,
      },
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    if (isCustomError(error)) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const validatedBody = categorySchemaUpdate.parse(req.body);
    const { id, name } = validatedBody;
    const categories = await prisma.category.findMany({
      where: {
        authorId: 0,
      },
    });
    if (categories.some((category) => category.name === name)) {
      throw CustomError(`The "${name}" category already exists`, 400);
    }
    const category = await prisma.category.update({
      where: { id: id },
      data: { name },
    });
    if (!category) {
      throw CustomError(`The category with id "${id}" does not exist`, 400);
    }
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    if (isCustomError(error)) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
