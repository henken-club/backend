import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { PaginationService } from "../pagination/pagination.service";

import {
  Following,
  FollowingOrder,
  FollowingOrderField,
} from "~/entities/following.entities";
import { PaginationArgs } from "~/entities/pagination.entities";
import { UserConnection } from "~/entities/user.entities";
import {
  FOLLOWING_SERVICE_NAME,
  FollowingClient,
  FollowingOrder_OrderField,
} from "~/protogen/core/following";

@Injectable()
export class FollowingsService implements OnModuleInit {
  private client!: FollowingClient;

  constructor(
    @Inject("GrpcCoreClient") private readonly grpcClient: ClientGrpc,
    private readonly pagination: PaginationService,
  ) {}

  onModuleInit() {
    this.client = this.grpcClient.getService<FollowingClient>(
      FOLLOWING_SERVICE_NAME,
    );
  }

  getById(id: string): Observable<Following> {
    return this.client.getFollowing({ id })
      .pipe(
        map(({ following }) => {
          if (!following) {
            throw new Error();
          }
          return ({ ...following });
        }),
      );
  }

  convertGrpcHenkenOrderField(
    direction: FollowingOrderField,
  ): FollowingOrder_OrderField {
    switch (direction) {
      case FollowingOrderField.FOLLOWED_AT:
        return FollowingOrder_OrderField.FOLLOWED_AT;
      default:
        throw new Error("Invalid order direction");
    }
  }

  convertGrpcHenkenOrder({ direction, field }: FollowingOrder) {
    return {
      direction: this.pagination.convertGrpcOrderDirection(direction),
      field: this.convertGrpcHenkenOrderField(field),
    };
  }

  getMany(
    pagination: PaginationArgs,
    order: FollowingOrder,
    filter: {
      fromId: string | null;
      toId: string | null;
    },
  ): Observable<UserConnection> {
    const convertedPagination = this.pagination.convertGrpcPagination(
      pagination,
    );
    const convertedOrder = this.convertGrpcHenkenOrder(order);
    return this.client.manyFollowings({
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
