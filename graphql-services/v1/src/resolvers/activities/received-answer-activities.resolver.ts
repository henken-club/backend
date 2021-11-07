import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { ReceivedAnswerActivity } from "~/entities/activity.entities";
import { Answer } from "~/entities/answer.entities";
import { AnswersService } from "~/services/answers/answers.service";

@Resolver(() => ReceivedAnswerActivity)
export class ReceivedAnswerActivitiesResolver {
  constructor(private readonly answers: AnswersService) {}

  @ResolveField(() => Answer, { name: "answer" })
  resolveAnswer(@Parent() { answerId }: ReceivedAnswerActivity) {
    return this.answers.getById(answerId);
  }
}
