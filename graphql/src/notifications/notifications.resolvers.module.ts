import { Module } from "@nestjs/common";

import { NotificationsModule } from "./notifications.module";
import { NotificationEdgesResolver } from "./resolvers/notifications-edges.resolver";
import { NotificationsResolver } from "./resolvers/notifications.resolver";
import { ReceivedAnswerNotificationsResolver } from "./resolvers/received-answer-notifications.resolver";
import { ReceivedHenkenNotificationsResolver } from "./resolvers/received-henken-notifications.resolver";

import { AnswersModule } from "~/answers/answers.module";
import { HenkensModule } from "~/henkens/henkens.module";

@Module({
  imports: [NotificationsModule, HenkensModule, AnswersModule],
  providers: [
    NotificationsResolver,
    NotificationEdgesResolver,
    ReceivedHenkenNotificationsResolver,
    ReceivedAnswerNotificationsResolver,
  ],
})
export class NotificationsResolversModule {}
