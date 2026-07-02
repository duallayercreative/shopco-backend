import status from "http-status";
import AppError from "../../errors/app-error.js";
import { auth } from "../../lib/auth.js";
import { prisma } from "../../lib/prisma.js";
import { RegisterUser } from "./auth.interface.js";
import { User } from "@prisma/client";

const registerUser = async (payload: RegisterUser): Promise<Partial<User>> => {
  try {
    const { name, email, password } = payload;

    const isUserExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserExist) {
      throw new AppError("User already exists", status.CONFLICT);
    }

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return result.user;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Failed to register user", status.INTERNAL_SERVER_ERROR);
  }
};

const loginUser = async () => {};

export const authService = {
  registerUser,
  loginUser,
};
