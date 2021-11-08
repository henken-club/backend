import { Metadata } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { Observable } from "rxjs";

import { UserService } from "./user.service";

import { PaginationDirection } from "~/protogen/common/pagination";
import {
  CreateUserRequest,
  CreateUserResponse,
  FindUserRequest,
  FindUserResponse,
  GetUserRequest,
  GetUserResponse,
  HENKENCLUB_CORE_PACKAGE_NAME,
  ManyUsersRequest,
  ManyUsersResponse,
  UserController as IUserController,
  UserControllerMethods,
  UserOrderField,
} from "~/protogen/core/user";
import { Code } from "~/protogen/google/rpc/code";

@UserControllerMethods()
@Controller(HENKENCLUB_CORE_PACKAGE_NAME)
export class UserController implements IUserController {
  constructor(private readonly user: UserService) {}

  async getUser({ id }: GetUserRequest): Promise<GetUserResponse> {
    return this.user.getById(id)
      .then((user) => (
        {
          status: { code: Code.OK, message: "Got user successfully" },
          user,
        }
      )).catch(() => (
        {
          status: { code: Code.NOT_FOUND, message: "User not found" },
          user: undefined,
        }
      ));
  }

  async findUser({ query }: FindUserRequest): Promise<FindUserResponse> {
    if (query && query.$case === "id") {
      return this.user
        .findById(query.id)
        .then((user) => ({
          status: {
            code: Code.OK,
            message: "Got user successfully",
          },
          user: user || undefined,
        }));
    } else if (query && query.$case === "alias") {
      return this.user
        .findByAlias(query.alias)
        .then((user) => ({
          status: {
            code: Code.OK,
            message: "Find user successfully",
          },
          user: user || undefined,
        }));
    } else {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required either alias or id",
        },
        user: undefined,
      };
    }
  }

  async manyUsers(
    { order, paginationQuery }: ManyUsersRequest,
  ): Promise<ManyUsersResponse> {
    if (!order && !paginationQuery) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required order and pagination query",
        },
        connection: undefined,
      };
    } else if (!order) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required order",
        },
        connection: undefined,
      };
    } else if (!paginationQuery) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required pagination query",
        },
        connection: undefined,
      };
    }

    const direction = (
      (direction) => {
        switch (direction) {
          case PaginationDirection.ASC:
            return "asc";
          case PaginationDirection.DESC:
            return "desc";
          default:
            return null;
        }
      }
    )(order.direction);
    if (!direction) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Invalid order direction",
        },
        connection: undefined,
      };
    }

    const orderBy = (
      (field, direction: "asc" | "desc"):
        | null
        | { createdAt: "asc" | "desc" }
        | { updatedAt: "asc" | "desc" } => {
        switch (field) {
          case UserOrderField.USER_CREATED_AT:
            return { createdAt: direction };
          case UserOrderField.USER_UPDATED_AT:
            return { updatedAt: direction };
          default:
            return null;
        }
      }
    )(order.field, direction);
    if (!orderBy) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Invalid order field",
        },
        connection: undefined,
      };
    }

    if (
      paginationQuery.$case !== "backward"
      && paginationQuery.$case !== "forward"
    ) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required either forward or backward query",
        },
        connection: undefined,
      };
    } else if (paginationQuery.$case === "backward") {
      return this.user
        .getMany({
          last: paginationQuery.backward.last,
          before: paginationQuery.backward.before || null,
        }, orderBy)
        .then((connection) => ({
          status: {
            code: Code.OK,
            message: "Got many users successfully",
          },
          connection,
        }));
    } else {
      return this.user
        .getMany({
          first: paginationQuery.forward.first,
          after: paginationQuery.forward.after || null,
        }, orderBy)
        .then((connection) => ({
          status: {
            code: Code.OK,
            message: "Got many users successfully",
          },
          connection,
        }));
    }
  }

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Observable<CreateUserResponse> {
    throw new Error("Method not implemented.");
  }
}
