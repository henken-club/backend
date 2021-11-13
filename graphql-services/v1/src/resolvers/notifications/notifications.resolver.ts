import { Resolver } from "@nestjs/graphql";

import { Notification } from "~/entities/notification.entities";
import { NotificationsService } from "~/services/notifications/notifications.service";

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(
    private readonly notifications: NotificationsService,
  ) {}
}
