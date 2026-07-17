import status from "http-status";
import AppError from "../../errors/app-error.js";
import { QueryBuilder } from "../../utils/query-builder.js";
import { prisma } from "../../lib/prisma.js";
import { Prisma, User } from "@prisma/client";
import {
  IQueryParams,
  QueryResult,
} from "../../interfaces/query-builder.interface.js";
import { UpdateUser } from "./user.interface.js";

const getUsers = async (query: IQueryParams): Promise<QueryResult<User>> => {
  try {
    const queryBuilder = new QueryBuilder<
      User,
      Prisma.UserWhereInput,
      Prisma.UserInclude
    >(prisma.user, query, {});

    const result = await queryBuilder
      .pagination()
      .sort()
      .where({
        deletedAt: null,
      })
      .search()
      .filter()
      .select()
      .includes({
        _count: true,
      })
      .execute();

    return result;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (
  id: string,
  payload: UpdateUser,
): Promise<User> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new AppError("User not found", status.NOT_FOUND);
    }

    const result = await prisma.user.update({
      where: { id },
      data: payload,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (id: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new AppError("User not found", status.NOT_FOUND);
    }

    await prisma.user.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    throw error;
  }
};

export const userService = {
  getUsers,
  updateProfile,
  deleteUserById,
};
