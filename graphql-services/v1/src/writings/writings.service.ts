import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { PaginationService } from "../pagination/pagination.service";

import { HenkenConnection } from "~/henkens/henken.entities";
import { PaginationArgs } from "~/pagination/pagination.entities";
import {
  ManyWritingsRequest_Order_OrderField,
  WRITING_SERVICE_NAME,
  WritingClient,
} from "~/protogen/content/writing";
import { Writing, WritingOrder, WritingOrderField } from "./writings.entities";

@Injectable()
export class WritingsService {
  private client: WritingClient;

  constructor(
    @Inject("GrpcContentClient") private readonly grpcClient: ClientGrpc,
    private readonly pagination: PaginationService,
  ) {
    this.client = this.grpcClient.getService<WritingClient>(
      WRITING_SERVICE_NAME,
    );
  }

  async getById(id: string): Promise<Writing> {
    return {} as Writing;
  }

  convertGrpcHenkenOrderField(
    direction: WritingOrderField,
  ): ManyWritingsRequest_Order_OrderField {
    switch (direction) {
      case WritingOrderField.AUTHOR_NAME:
        return ManyWritingsRequest_Order_OrderField.AUTHOR_NAME;
      case WritingOrderField.BOOK_NAME:
        return ManyWritingsRequest_Order_OrderField.BOOK_NAME;
      default:
        throw new Error("Invalid order direction");
    }
  }

  convertGrpcManyWritingOrder({ direction, field }: WritingOrder) {
    return {
      direction: this.pagination.convertGrpcOrderDirection(direction),
      field: this.convertGrpcHenkenOrderField(field),
    };
  }

  getMany(
    pagination: PaginationArgs,
    order: WritingOrder,
    filter: {
      authorId: string | null;
      bookId: string | null;
    },
  ): Observable<HenkenConnection> {
    const convertedPagination = this.pagination.convertGrpcPagination(
      pagination,
    );
    const convertedOrder = this.convertGrpcManyWritingOrder(order);
    return this.client.manyWritings({
      ...convertedPagination,
      order: convertedOrder,
      filter: {
        authorId: filter.authorId || undefined,
        bookId: filter.bookId || undefined,
      },
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
