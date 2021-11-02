import { Injectable } from "@nestjs/common";

import { Answer } from "~/entities/answer.entities";

@Injectable()
export class AnswersService {
  constructor() {}

  async getById(id: string): Promise<Answer> {
    return {} as Answer;
  }

  async findById(
    id: string,
  ): Promise<Answer | null> {
    return {} as Answer;
  }
}
