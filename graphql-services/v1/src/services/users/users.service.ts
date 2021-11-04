import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { PaginationService } from "../pagination/pagination.service";

import { PaginationArgs } from "~/entities/pagination.entities";
import {
  User,
  UserConnection,
  UserOrder,
  UserOrderField,
} from "~/entities/user.entities";
import {
  USER_SERVICE_NAME,
  UserClient,
  UserOrderField as GrpcUserOrderField,
} from "~/protogen/core/user";

@Injectable()
export class UsersService implements OnModuleInit {
  private client!: UserClient;

  constructor(
    @Inject("CoreGrpcClient") private readonly grpcClient: ClientGrpc,
    private readonly pagination: PaginationService,
  ) {}

  onModuleInit() {
    this.client = this.grpcClient.getService<UserClient>(USER_SERVICE_NAME);
  }

  getById(id: string): Observable<User> {
    return this.client.getUser({ id })
      .pipe(
        map(({ user }) => {
          if (!user) {
            throw new Error();
          }
          return ({ avatar: user.avatarUrl, ...user });
        }),
      );
  }

  findById(id: string): Observable<User | null> {
    return this.client.findUser({ id, alias: undefined })
      .pipe(
        map(({ user }) => {
          if (!user) {
            return null;
          }
          return ({ avatar: user.avatarUrl, ...user });
        }),
      );
  }

  findByAlias(alias: string): Observable<User | null> {
    return this.client.findUser({ alias, id: undefined }).pipe(
      map(({ user }) => {
        if (!user) {
          return null;
        }
        return ({ avatar: user.avatarUrl, ...user });
      }),
    );
  }

  convertGrpcHenkenOrderField(
    direction: UserOrderField,
  ): GrpcUserOrderField {
    switch (direction) {
      case UserOrderField.CREATED_AT:
        return GrpcUserOrderField.USER_CREATED_AT;
      case UserOrderField.UPDATED_AT:
        return GrpcUserOrderField.USER_UPDATED_AT;
      default:
        throw new Error("Invalid order direction");
    }
  }

  convertGrpcHenkenOrder({ direction, field }: UserOrder) {
    return {
      direction: this.pagination.convertGrpcOrderDirection(direction),
      field: this.convertGrpcHenkenOrderField(field),
    };
  }

  getMany(
    pagination: PaginationArgs,
    order: UserOrder,
  ): Observable<UserConnection> {
    const convertedPagination = this.pagination.convertGrpcPagination(
      pagination,
    );
    const convertedOrder = this.convertGrpcHenkenOrder(order);
    return this.client.manyUsers({
      ...convertedPagination,
      order: convertedOrder,
    })
      .pipe(
        map(({ connection }) => {
          if (!connection) {
            throw new Error();
          }
          if (!connection.edges) {
            throw new Error();
          }
          if (!connection.pageInfo) {
            throw new Error();
          }
          if (!connection.totalCount) {
            throw new Error();
          }
          return ({
            edges: connection.edges.map(({ node, cursor }) => {
              if (!node) {
                throw new Error();
              }

              return ({ node, cursor });
            }),
            pageInfo: connection.pageInfo,
            totalCount: connection.totalCount,
          });
        }),
      );
  }
}
