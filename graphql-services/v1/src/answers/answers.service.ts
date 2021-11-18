import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { Answer, AnswerType } from "~/answers/answers.entities";
import {
  ANSWER_SERVICE_NAME,
  AnswerClient,
  AnswerType as GrpcAnswerType,
} from "~/protogen/core/answer";
import { TimestampService } from "~/timestamp/timestamp.service";

@Injectable()
export class AnswersService {
  private client: AnswerClient;

  constructor(
    @Inject("GrpcCoreClient") private readonly grpcClient: ClientGrpc,
    private readonly timestamp: TimestampService,
  ) {
    this.client = this.grpcClient.getService<AnswerClient>(ANSWER_SERVICE_NAME);
  }

  convertType(type: GrpcAnswerType): AnswerType {
    switch (type) {
      case GrpcAnswerType.RIGHT:
        return AnswerType.RIGHT;
      case GrpcAnswerType.WRONG:
        return AnswerType.WRONG;
      default:
        throw new Error("Invalid grpc answer type");
    }
  }

  convertToGrpcType(type: AnswerType): GrpcAnswerType {
    switch (type) {
      case AnswerType.RIGHT:
        return GrpcAnswerType.RIGHT;
      case AnswerType.WRONG:
        return GrpcAnswerType.WRONG;
      default:
        throw new Error("Invalid answer type");
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

          return ({
            ...answer,
            type: this.convertType(answer.type),
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

          return ({
            ...answer,
            type: this.convertType(answer.type),
            createdAt: this.timestamp.convert(answer.createdAt),
            updatedAt: this.timestamp.convert(answer.updatedAt),
          });
        }),
      );
  }

  createAnswer(
    { henkenId, comment, answerType: type }: {
      henkenId: string;
      comment: string;
      answerType: AnswerType;
    },
  ): Observable<Answer> {
    return this.client
      .createAnswer({
        henkenId,
        comment,
        type: this.convertToGrpcType(type),
      })
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

          return ({
            ...answer,
            type: this.convertType(answer.type),
            createdAt: this.timestamp.convert(answer.createdAt),
            updatedAt: this.timestamp.convert(answer.updatedAt),
          });
        }),
      );
  }
}
