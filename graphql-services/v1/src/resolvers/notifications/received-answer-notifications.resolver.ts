import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Henken } from "~/entities/henken.entities";
import { ReceivedAnswerNotification } from "~/entities/notification.entities";
import { AnswersService } from "~/services/answers/answers.service";

@Resolver(() => ReceivedAnswerNotification)
export class ReceivedAnswerNotificationsResolver {
  constructor(
    private readonly answers: AnswersService,
  ) {}

  @ResolveField(() => Henken, { name: "henken" })
  resolveBookcover(@Parent() { answerId }: ReceivedAnswerNotification) {
    return this.answers.getById(answerId);
  }
}
