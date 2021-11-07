import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import {
  Notification,
  NotificationConnection,
  NotificationOrder,
} from "~/entities/notification.entities";
import { PaginationArgs } from "~/entities/pagination.entities";

@Injectable()
export class NotificationsService {
  constructor() {
  }

  getById(id: string): Observable<Notification> {
    return {} as Observable<Notification>;
  }

  getMany(
    pagination: PaginationArgs,
    order: NotificationOrder,
  ): Observable<NotificationConnection> {
    return {} as Observable<NotificationConnection>;
  }
}
