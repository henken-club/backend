import { Controller } from "@nestjs/common";

import { AnswersService } from "./answer.service";

import { HenkensService } from "~/henken/henken.service";
import {
  AnswerController as IAnswerController,
  AnswerControllerMethods,
  CreateAnswerRequest,
  CreateAnswerResponse,
  FindAnswerRequest,
  FindAnswerResponse,
  GetAnswerRequest,
  GetAnswerResponse,
  HENKENCLUB_CORE_PACKAGE_NAME,
} from "~/protogen/core/answer";
import { Code } from "~/protogen/google/rpc/code";

@AnswerControllerMethods()
@Controller(HENKENCLUB_CORE_PACKAGE_NAME)
export class AnswerController implements IAnswerController {
  constructor(
    private readonly answers: AnswersService,
    private readonly henkens: HenkensService,
  ) {}

  async getAnswer({ id }: GetAnswerRequest): Promise<GetAnswerResponse> {
    return this.answers.getById(id)
      .then((answer) => {
        return (
          {
            status: { code: Code.OK, message: "Got answer successfully" },
            answer: this.answers.convertToGrpcEntity(answer),
          }
        );
      }).catch(() => (
        {
          status: { code: Code.NOT_FOUND, message: "Answer not found" },
          answer: undefined,
        }
      ));
  }

  async findAnswer(
    { query }: FindAnswerRequest,
  ): Promise<FindAnswerResponse> {
    if (query && query.$case === "id") {
      return this.answers.findById(query.id)
        .then((answer) => {
          return (
            {
              status: { code: Code.OK, message: "Find answer successfully" },
              answer: answer
                ? this.answers.convertToGrpcEntity(answer)
                : undefined,
            }
          );
        });
    } else {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required id for query",
        },
        answer: undefined,
      };
    }
  }

  async createAnswer(
    { comment, henkenId, type }: CreateAnswerRequest,
  ): Promise<CreateAnswerResponse> {
    if (!await this.henkens.getById(henkenId)) {
      return ({
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Specified henken does not exist",
        },
        answer: undefined,
      });
    }
    return this.answers.create({
      comment,
      henkenId,
      type: this.answers.convertFromGrpcAnswerType(type),
    }).then(
      (answer) => ({
        status: { code: Code.OK, message: "Created answer successfully" },
        answer: this.answers.convertToGrpcEntity(answer),
      }),
    ).catch(
      () => ({
        status: { code: Code.INTERNAL, message: "Internal error" },
        answer: undefined,
      }),
    );
  }
}
