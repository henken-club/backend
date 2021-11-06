import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Answer } from "~/entities/answer.entities";
import { ReceivedAnswerNotification } from "~/entities/notification.entities";
import { AnswersService } from "~/services/answers/answers.service";

@Resolver(() => ReceivedAnswerNotification)
export class ReceivedAnswerNotificationsResolver {
  constructor(
    private readonly answers: AnswersService,
  ) {}

  @ResolveField(() => Answer, { name: "answer" })
  resolveAnswer(@Parent() { answerId }: ReceivedAnswerNotification) {
    return this.answers.getById(answerId);
  }
}
