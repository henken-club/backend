import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { PostAnswerActivity } from "../activities.entities";

import { Answer } from "~/answers/answers.entities";
import { AnswersService } from "~/answers/answers.service";

@Resolver(() => PostAnswerActivity)
export class PostAnswerActivitiesResolver {
  constructor(private readonly answers: AnswersService) {}

  @ResolveField(() => Answer, { name: "answer" })
  resolveAnswer(@Parent() { answerId }: PostAnswerActivity) {
    return this.answers.getById(answerId);
  }
}
