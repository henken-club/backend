import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { TimestampService } from "../timestamp/timestamp.service";

import { Henken } from "~/entities/henken.entities";
import { HENKEN_SERVICE_NAME, HenkenClient } from "~/protogen/core/henken";

@Injectable()
export class HenkensService {
  private client: HenkenClient;

  constructor(
    @Inject("CoreGrpcClient") private readonly grpcClient: ClientGrpc,
    private readonly timestamp: TimestampService,
  ) {
    this.client = this.grpcClient.getService<HenkenClient>(HENKEN_SERVICE_NAME);
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
            contentId: henken.contentId,
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
            contentId: henken.contentId,
          });
        }),
      );
  }
}
