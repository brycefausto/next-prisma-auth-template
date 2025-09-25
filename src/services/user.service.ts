import { checkAuth } from "@/auth";
import { CreateUserDto, UpdateUserDto } from "@/interfaces/user.dto";
import { hashPassword } from "@/lib/password.utils";
import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();
export class UserService {
  // CREATE
  async createUser(data: CreateUserDto) {
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
    data: UpdateUserDto
  ) {
    await checkAuth(Role.ADMIN);
    // Unverify email when the email is updated
    const user = await prisma.user.findUnique({ where: { id, email: data.email } });
    if (!user) {
      data.emailVerified = null;
    }
    if (data.email)
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
