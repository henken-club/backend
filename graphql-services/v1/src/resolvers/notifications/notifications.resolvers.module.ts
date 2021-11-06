import { Module } from "@nestjs/common";

import { NotificationEdgesResolver } from "./notifications-edges.resolver";
import { NotificationsResolver } from "./notifications.resolver";
import { ReceivedAnswerNotificationsResolver } from "./received-answer-notifications.resolver";
import { ReceivedHenkenNotificationsResolver } from "./received-henken-notifications.resolver";

import { AnswersModule } from "~/services/answers/answers.module";
import { HenkensModule } from "~/services/henkens/henkens.module";
import { NotificationsModule } from "~/services/notifications/notifications.module";

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
