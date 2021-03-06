import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import {
  Notification,
  NotificationEdge,
} from "~/notifications/notifications.entities";
import { NotificationsService } from "~/notifications/notifications.service";

@Resolver(() => NotificationEdge)
export class NotificationEdgesResolver {
  constructor(private readonly notifications: NotificationsService) {}

  @ResolveField((type) => Notification, { name: "node" })
  resolveNode(
    @Parent() { node }: NotificationEdge,
  ): Observable<Notification> {
    return this.notifications.getById(node.id);
  }
}
