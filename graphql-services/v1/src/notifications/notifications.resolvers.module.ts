import { Module } from "@nestjs/common";

import { NotificationEdgesResolver } from "./notifications-edges.resolver";
import { NotificationsResolver } from "./notifications.resolver";
import { ReceivedAnswerNotificationsResolver } from "./received-answer-notifications.resolver";
import { ReceivedHenkenNotificationsResolver } from "./received-henken-notifications.resolver";

import { AnswersModule } from "~/answers/answers.module";
import { HenkensModule } from "~/henkens/henkens.module";
import { NotificationsModule } from "~/notifications/notifications.module";

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
