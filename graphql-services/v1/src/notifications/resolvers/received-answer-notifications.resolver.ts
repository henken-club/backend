import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Answer } from "~/answers/answers.entities";
import { AnswersService } from "~/answers/answers.service";
import { ReceivedAnswerNotification } from "~/notifications/notifications.entities";

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
