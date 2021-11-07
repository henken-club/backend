import { Metadata } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { Observable } from "rxjs";

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

@AnswerControllerMethods()
@Controller(HENKENCLUB_CORE_PACKAGE_NAME)
export class AnswerController implements IAnswerController {
  constructor() {}

  getAnswer(
    request: GetAnswerRequest,
    metadata?: Metadata,
  ): Observable<GetAnswerResponse> {
    throw new Error("Method not implemented.");
  }

  findAnswer(
    request: FindAnswerRequest,
    metadata?: Metadata,
  ): Observable<FindAnswerResponse> {
    throw new Error("Method not implemented.");
  }

  createAnswer(
    request: CreateAnswerRequest,
    metadata?: Metadata,
  ): Observable<CreateAnswerResponse> {
    throw new Error("Method not implemented.");
  }
}
