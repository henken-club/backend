import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { ReceivedAnswerActivity } from "../activities.entities";

import { Answer } from "~/answers/answers.entities";
import { AnswersService } from "~/answers/answers.service";

@Resolver(() => ReceivedAnswerActivity)
export class ReceivedAnswerActivitiesResolver {
  constructor(private readonly answers: AnswersService) {}

  @ResolveField(() => Answer, { name: "answer" })
  resolveAnswer(@Parent() { answerId }: ReceivedAnswerActivity) {
    return this.answers.getById(answerId);
  }
}
