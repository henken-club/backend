import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { TimestampService } from "../timestamp/timestamp.service";

import { Answer, AnswerType } from "~/entities/answer.entities";
import {
  ANSWER_SERVICE_NAME,
  AnswerClient,
  AnswerType as GrpcAnswerType,
} from "~/protogen/core/answer";

@Injectable()
export class AnswersService {
  private client: AnswerClient;

  constructor(
    @Inject("GrpcCoreClient") private readonly grpcClient: ClientGrpc,
    private readonly timestamp: TimestampService,
  ) {
    this.client = this.grpcClient.getService<AnswerClient>(ANSWER_SERVICE_NAME);
  }

  convertType(type: GrpcAnswerType): AnswerType | null {
    switch (type) {
      case GrpcAnswerType.RIGHT:
        return AnswerType.RIGHT;
      case GrpcAnswerType.WRONG:
        return AnswerType.WRONG;
      default:
        return null;
    }
  }

  getById(id: string): Observable<Answer> {
    return this.client.getAnswer({ id })
      .pipe(
        map(({ answer }) => {
          if (!answer) {
            throw new Error();
          }
          if (!answer.createdAt) {
            throw new Error();
          }
          if (!answer.updatedAt) {
            throw new Error();
          }

          const type = this.convertType(answer.type);
          if (!type) {
            throw new Error();
          }

          return ({
            ...answer,
            type,
            createdAt: this.timestamp.convert(answer.createdAt),
            updatedAt: this.timestamp.convert(answer.updatedAt),
          });
        }),
      );
  }

  findById(id: string): Observable<Answer | null> {
    return this.client.findAnswer({ id })
      .pipe(
        map(({ answer }) => {
          if (!answer) {
            return null;
          }
          if (!answer.createdAt) {
            throw new Error();
          }
          if (!answer.updatedAt) {
            throw new Error();
          }

          const type = this.convertType(answer.type);
          if (!type) {
            throw new Error();
          }

          return ({
            ...answer,
            type,
            createdAt: this.timestamp.convert(answer.createdAt),
            updatedAt: this.timestamp.convert(answer.updatedAt),
          });
        }),
      );
  }
}
