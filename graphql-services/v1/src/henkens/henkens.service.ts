import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import {
  Henken,
  HenkenConnection,
  HenkenOrder,
  HenkenOrderField,
} from "./henkens.entities";

import { ContentType } from "~/content/content.entities";
import { PaginationArgs } from "~/pagination/pagination.entities";
import { PaginationService } from "~/pagination/pagination.service";
import { ContentType as GrpcContentType } from "~/protogen/content/type";
import {
  HENKEN_SERVICE_NAME,
  HenkenClient,
  HenkenEntity,
  HenkenOrderField as GrpcHenkenOrderField,
} from "~/protogen/core/henken";
import { TimestampService } from "~/timestamp/timestamp.service";

@Injectable()
export class HenkensService {
  private client: HenkenClient;

  constructor(
    @Inject("GrpcCoreClient") private readonly grpcClient: ClientGrpc,
    private readonly timestamp: TimestampService,
    private readonly pagination: PaginationService,
  ) {
    this.client = this.grpcClient.getService<HenkenClient>(HENKEN_SERVICE_NAME);
  }

  convertToContentType(type: GrpcContentType) {
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

  convertToGrpcContentType(type: ContentType) {
    switch (type) {
      case ContentType.BOOK:
        return GrpcContentType.BOOK;
      case ContentType.BOOK_SERIES:
        return GrpcContentType.BOOK_SERIES;
      case ContentType.AUTHOR:
        return GrpcContentType.AUTHOR;
    }
    throw new Error("Unrecognized content type");
  }

  convertContent(henken: HenkenEntity): Henken["content"] {
    if (henken.realContent) {
      return {
        attribute: "real",
        id: henken.realContent.id,
        type: this.convertToContentType(henken.realContent.type),
      };
    } else if (henken.tempContent) {
      return {
        attribute: "temp",
        id: henken.tempContent.id,
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

  createHenken(
    data:
      | {
        fromUserId: string;
        toUserId: string;
        comment: string;
        realContent: { id: string; type: ContentType };
      }
      | {
        fromUserId: string;
        toUserId: string;
        comment: string;
        tempContent: { id: string };
      },
  ): Observable<Henken> {
    return this.client.createHenken({
      realContent: "realContent" in data
        ? {
          id: data.realContent.id,
          type: this.convertToGrpcContentType(data.realContent.type),
        }
        : undefined,
      tempContent: "tempContent" in data
        ? { id: data.tempContent.id }
        : undefined,
      comment: data.comment,
      fromUserId: data.fromUserId,
      toUserId: data.toUserId,
    })
      .pipe(map(({ henken }) => {
        if (!henken) {
          throw new Error("Failed to create henken");
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
          answerId: null,
          content: this.convertContent(henken),
        });
      }));
  }
}
