import { Metadata } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { Observable } from "rxjs";

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
} from "~/protogen/core/user";

@UserControllerMethods()
@Controller(HENKENCLUB_CORE_PACKAGE_NAME)
export class UserController implements IUserController {
  constructor() {}

  getUser(
    request: GetUserRequest,
    metadata?: Metadata,
  ): Observable<GetUserResponse> {
    throw new Error("Method not implemented.");
  }

  findUser(
    request: FindUserRequest,
    metadata?: Metadata,
  ): Observable<FindUserResponse> {
    throw new Error("Method not implemented.");
  }

  manyUsers(
    request: ManyUsersRequest,
    metadata?: Metadata,
  ): Observable<ManyUsersResponse> {
    throw new Error("Method not implemented.");
  }

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Observable<CreateUserResponse> {
    throw new Error("Method not implemented.");
  }
}
