import { Resolver } from "@nestjs/graphql";

import { Notification } from "../notifications.entities";

import { NotificationsService } from "~/notifications/notifications.service";

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(
    private readonly notifications: NotificationsService,
  ) {}
}
