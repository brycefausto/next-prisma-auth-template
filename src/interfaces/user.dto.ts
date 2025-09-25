import { Role } from "@prisma/client";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: Role;
  phone?: string;
  address?: string;
}

export interface UpdateUserDto {
  name: string;
  email: string;
  image?: string;
  role?: Role;
  phone?: string;
  address?: string;
  emailVerified?: null;
}
