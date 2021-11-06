import { Module } from "@nestjs/common";

import { NotificationEdgesResolver } from "./notifications-edges.resolver";
import { NotificationsResolver } from "./notifications.resolver";

import { NotificationsModule } from "~/services/notifications/notifications.module";

@Module({
  imports: [NotificationsModule],
  providers: [NotificationsResolver, NotificationEdgesResolver],
})
export class NotificationsResolversModule {}
