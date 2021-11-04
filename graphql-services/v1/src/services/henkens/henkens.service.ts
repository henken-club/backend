import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { PaginationService } from "../pagination/pagination.service";
import { TimestampService } from "../timestamp/timestamp.service";

import { ContentType } from "~/entities/content.entities";
import {
  Henken,
  HenkenConnection,
  HenkenOrder,
  HenkenOrderField,
} from "~/entities/henken.entities";
import { PaginationArgs } from "~/entities/pagination.entities";
import { ContentType as GrpcContentType } from "~/protogen/content/type";
import {
  HENKEN_SERVICE_NAME,
  HenkenClient,
  HenkenEntity,
  HenkenOrderField as GrpcHenkenOrderField,
} from "~/protogen/core/henken";

@Injectable()
export class HenkensService {
  private client: HenkenClient;

  constructor(
    @Inject("CoreGrpcClient") private readonly grpcClient: ClientGrpc,
    private readonly timestamp: TimestampService,
    private readonly pagination: PaginationService,
  ) {
    this.client = this.grpcClient.getService<HenkenClient>(HENKEN_SERVICE_NAME);
  }

  convertContentType(type: GrpcContentType) {
    switch (type) {
      case GrpcContentType.BOOK:
        return ContentType.BOOK;
      case GrpcContentType.BOOK_SERIES:
        return ContentType.BOOK_SERIES;
      case GrpcContentType.AUTHOR:
        return ContentType.AUTHOR;
      default:
        throw new Error("Unrecognized content type");
    }
  }

  convertContent(henken: HenkenEntity): Henken["content"] {
    if (henken.realContent) {
      return {
        type: "real",
        contentId: henken.realContent.id,
        contentType: this.convertContentType(henken.realContent.type),
      };
    } else if (henken.tempContent) {
      return {
        type: "temp",
        contentId: henken.tempContent.id,
      };
    } else {
      throw new Error("Not related content");
    }
  }

  getById(id: string): Observable<Henken> {
    return this.client.getHenken({ id })
      .pipe(
        map(({ henken }) => {
          if (!henken) {
            throw new Error();
          }
          if (!henken.createdAt) {
            throw new Error();
          }
          if (!henken.updatedAt) {
            throw new Error();
          }
          return ({
            ...henken,
            createdAt: this.timestamp.convert(henken.createdAt),
            updatedAt: this.timestamp.convert(henken.updatedAt),
            answerId: henken.answerId || null,
            content: this.convertContent(henken),
          });
        }),
      );
  }

  findById(id: string): Observable<Henken | null> {
    return this.client.findHenken({ id })
      .pipe(
        map(({ henken }) => {
          if (!henken) {
            return null;
          }
          if (!henken.createdAt) {
            throw new Error();
          }
          if (!henken.updatedAt) {
            throw new Error();
          }
          return ({
            ...henken,
            createdAt: this.timestamp.convert(henken.createdAt),
            updatedAt: this.timestamp.convert(henken.updatedAt),
            answerId: henken.answerId || null,
            content: this.convertContent(henken),
          });
        }),
      );
  }

  convertGrpcHenkenOrderField(
    direction: HenkenOrderField,
  ): GrpcHenkenOrderField {
    switch (direction) {
      case HenkenOrderField.CREATED_AT:
        return GrpcHenkenOrderField.HENKEN_CREATED_AT;
      case HenkenOrderField.UPDATED_AT:
        return GrpcHenkenOrderField.HENKEN_UPDATED_AT;
      default:
        throw new Error("Invalid order direction");
    }
  }

  convertGrpcHenkenOrder({ direction, field }: HenkenOrder) {
    return {
      direction: this.pagination.convertGrpcOrderDirection(direction),
      field: this.convertGrpcHenkenOrderField(field),
    };
  }

  getMany(
    pagination: PaginationArgs,
    order: HenkenOrder,
    filter: {
      fromId: string | null;
      toId: string | null;
    },
  ): Observable<HenkenConnection> {
    const convertedPagination = this.pagination.convertGrpcPagination(
      pagination,
    );
    const convertedOrder = this.convertGrpcHenkenOrder(order);
    return this.client.manyHenkens({
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
