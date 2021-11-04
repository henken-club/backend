import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { TimestampService } from "../timestamp/timestamp.service";

import { Henken } from "~/entities/henken.entities";
import { ContentType } from "~/protogen/content/type";
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

  convertContentType(type: ContentType) {
    switch (type) {
      case ContentType.BOOK:
        return "BOOK";
      case ContentType.BOOK_SERIES:
        return "BOOK_SERIES";
      case ContentType.AUTHOR:
        return "AUTHOR";
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
          const content = this.convertContent(henken);
          return ({
            ...henken,
            createdAt: this.timestamp.convert(henken.createdAt),
            updatedAt: this.timestamp.convert(henken.updatedAt),
            answerId: henken.answerId || null,
            content,
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
          const content = this.convertContent(henken);
          if (!content) {
            throw new Error();
          }
          return ({
            ...henken,
            createdAt: this.timestamp.convert(henken.createdAt),
            updatedAt: this.timestamp.convert(henken.updatedAt),
            answerId: henken.answerId || null,
            content,
          });
        }),
      );
  }
}
