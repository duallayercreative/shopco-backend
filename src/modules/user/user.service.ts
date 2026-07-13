import status from "http-status";
import AppError from "../../errors/app-error.js";
import { QueryBuilder } from "../../utils/query-builder.js";
import { prisma } from "../../lib/prisma.js";
import { Prisma, User } from "@prisma/client";
import {
  IQueryParams,
  QueryResult,
} from "../../interfaces/query-builder.interface.js";

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
    throw new AppError("Failed to get users", status.INTERNAL_SERVER_ERROR);
  }
};

export const userService = {
  getUsers,
};
