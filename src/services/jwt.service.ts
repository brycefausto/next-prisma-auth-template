// lib/services/userService.ts
import { SECRET_KEY } from "@/config/env";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface TokenPayload {
  userId: string;
}

export class JWTService {
  createToken(userId: string) {
    const payload: TokenPayload = { userId };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  }

  async verifyToken(token: string) {
    return new Promise<TokenPayload | undefined>((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(decoded as TokenPayload | undefined);
      });
    });
  }

  // CREATE
  async createUser(data: Omit<User, "id" | "createdAt" | "updatedAt">) {
    return prisma.user.create({
      data,
    });
  }

  // DELETE
  async deleteUser(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}

// singleton instance
export const jwtService = new JWTService();
