"use server";

import { CreateUserData, UpdateUserData } from "@/schemas/user";
import { userService } from "@/services/user.service";
import { ActionResultState } from "@/types";
import { User } from "@prisma/client";
import _ from "lodash";
import { revalidatePath } from "next/cache";

export async function createUserAction(
  data: CreateUserData
): Promise<ActionResultState<User>> {
  try {
    const createDto = _.omit(data, ["confirmPassword"]);
    const user = await userService.createUser(createDto);

    revalidatePath("/users");

    return {
      success: true,
      data: user,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.log(error.message);
    return { message: "Failed to create user" };
  }
}

export async function updateUserAction(
  id: string,
  data: UpdateUserData
): Promise<ActionResultState<User>> {
  try {
    const user = await userService.updateUser(id, {
      ...data,
    });
    revalidatePath("/users");

    return {
      success: true,
      data: user,
      message: "User updated successfully",
    };
  } catch (error: any) {
    console.log(error.message);
    return { message: "Failed to update user" };
  }
}

export async function deleteUserAction(id: string): Promise<ActionResultState> {
  try {
    await userService.deleteUser(id);
    revalidatePath("/users");

    return {
      success: true,
      message: "User successfully deleted",
    };
  } catch (error) {
    return { message: "Failed to update user" };
  }
}
