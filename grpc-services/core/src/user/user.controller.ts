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

@UserControllerMethods()
@Controller(HENKENCLUB_CORE_PACKAGE_NAME)
export class UserController implements IUserController {
  constructor(private readonly user: UserService) {}

  async getUser({ id }: GetUserRequest): Promise<GetUserResponse> {
    return this.user.getById(id).then((user) => ({ user }));
  }

  async findUser({ query }: FindUserRequest): Promise<FindUserResponse> {
    if (query && query.$case === "id") {
      return this.user
        .findById(query.id)
        .then((user) => ({ user: user || undefined }));
    } else if (query && query.$case === "alias") {
      return this.user
        .findByAlias(query.alias)
        .then((user) => ({ user: user || undefined }));
    } else {
      return {
        user: undefined,
      };
    }
  }

  async manyUsers(
    { order, paginationQuery }: ManyUsersRequest,
  ): Promise<ManyUsersResponse> {
    if (!order || !paginationQuery) {
      return {};
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
      return {};
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
      return {};
    }

    if (paginationQuery.$case === "backward") {
      return this.user
        .getMany({
          last: paginationQuery.backward.last,
          before: paginationQuery.backward.before || null,
        }, orderBy)
        .then((connection) => ({ connection }));
    } else if (paginationQuery.$case === "forward") {
      return this.user
        .getMany({
          first: paginationQuery.forward.first,
          after: paginationQuery.forward.after || null,
        }, orderBy)
        .then((connection) => ({ connection }));
    } else {
      return {};
    }
  }

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Observable<CreateUserResponse> {
    throw new Error("Method not implemented.");
  }
}
