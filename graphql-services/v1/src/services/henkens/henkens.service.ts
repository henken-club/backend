import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { TimestampService } from "../timestamp/timestamp.service";

import { ContentType } from "~/entities/content.entities";
import { Henken } from "~/entities/henken.entities";
import { ContentType as GrpcContentType } from "~/protogen/content/type";
import {
  HENKEN_SERVICE_NAME,
  HenkenClient,
  HenkenEntity,
} from "~/protogen/core/henken";

@Injectable()
export class HenkensService {
  private client: HenkenClient;

  constructor(
    @Inject("CoreGrpcClient") private readonly grpcClient: ClientGrpc,
    private readonly timestamp: TimestampService,
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
}
