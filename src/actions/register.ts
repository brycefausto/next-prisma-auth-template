"use server";
import { RegisterData } from "@/schemas/auth";
import { ActionResultState } from "@/types";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function registerAction(
  registerData: RegisterData
): Promise<ActionResultState<User>> {
  const { email, password, name } = registerData;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      message: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  return {
    success: true,
    data: user,
  };
}
