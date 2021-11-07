import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { PostAnswerActivity } from "~/entities/activity.entities";
import { Answer } from "~/entities/answer.entities";
import { AnswersService } from "~/services/answers/answers.service";

@Resolver(() => PostAnswerActivity)
export class PostAnswerActivitiesResolver {
  constructor(private readonly answers: AnswersService) {}

  @ResolveField(() => Answer, { name: "answer" })
  resolveAnswer(@Parent() { answerId }: PostAnswerActivity) {
    return this.answers.getById(answerId);
  }
}
