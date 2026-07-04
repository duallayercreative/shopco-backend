import status from "http-status";
import AppError from "../../errors/app-error.js";
import { auth } from "../../lib/auth.js";
import { prisma } from "../../lib/prisma.js";
import { RegisterUser, VerifyEmail } from "./auth.interface.js";
import { User } from "@prisma/client";

const registerUser = async (payload: RegisterUser): Promise<void> => {
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

    // return result.user;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Failed to register user", status.INTERNAL_SERVER_ERROR);
  }
};

const verifyEmail = async (payload: VerifyEmail): Promise<void> => {
  try {
    const { email, otp } = payload;

    const result = await auth.api.verifyEmailOTP({
      body: {
        email,
        otp,
      },
    });

    if (result.status && !result.user.emailVerified) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (error) {
    throw new AppError("Failed to verify email", status.INTERNAL_SERVER_ERROR);
  }
};

const loginUser = async () => {};

export const authService = {
  registerUser,
  verifyEmail,
  loginUser,
};
