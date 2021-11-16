import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Answer } from "~/answers/answer.entities";
import { AnswersService } from "~/answers/answers.service";
import { ReceivedAnswerNotification } from "~/notifications/notification.entities";

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
