import { NotFoundException } from "@nestjs/common";
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";

import { FindAnswerArgs, FindAnswerPayload } from "./dto/find-answer.dto";

import { Answer, AnswerEdge } from "~/entities/answer.entities";
import { AnswersService } from "~/services/answers/answers.service";

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly answers: AnswersService) {}

  @Query(() => Answer, { name: "answer" })
  async getAnswer(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<Answer> {
    const result = await this.answers.getById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Query(() => FindAnswerPayload, { name: "findAnswer" })
  async findAnswer(
    @Args({ type: () => FindAnswerArgs }) { id }: FindAnswerArgs,
  ): Promise<FindAnswerPayload> {
    const result = await this.answers.findById(id);

    return { answer: result };
  }
}

@Resolver(() => AnswerEdge)
export class AnswerEdgesResolver {
  constructor(private readonly answers: AnswersService) {}

  @ResolveField((type) => Answer, { name: "node" })
  async resolveNode(
    @Parent() { node }: AnswerEdge,
  ): Promise<Answer> {
    return this.answers.getById(node.id);
  }
}
