import { checkAuth } from "@/auth";
import { hashPassword } from "@/lib/password.utils";
import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  // CREATE
  async createUser(data: Omit<User, "id" | "createdAt" | "updatedAt">) {
    await checkAuth(Role.ADMIN);
    return prisma.user.create({
      data,
    });
  }

  // READ (users by page)
  async getUsers(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    const users = await prisma.user.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.user.count();

    return {
      users,
      totalPages: Math.ceil(total / pageSize),
      currentPage: page,
    };
  }

  // READ (single user)
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserByIdAndPassword(id: string, password: string) {
    const hashedPassword = await hashPassword(password);
    return prisma.user.findUnique({
      where: { id, password: hashedPassword },
    });
  }

  // UPDATE
  async updateUser(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ) {
    await checkAuth(Role.ADMIN);
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  // DELETE
  async deleteUser(id: string) {
    await checkAuth(Role.ADMIN);
    return prisma.user.delete({
      where: { id },
    });
  }
}

// singleton instance
export const userService = new UserService();
