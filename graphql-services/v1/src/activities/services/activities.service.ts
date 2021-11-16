import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import {
  Activity,
  ActivityConnection,
  ActivityOrder,
} from "~/activities/activities.entities";
import { PaginationArgs } from "~/pagination/pagination.entities";

@Injectable()
export class ActivitiesService {
  constructor() {
  }

  getById(id: string): Observable<Activity> {
    return {} as Observable<Activity>;
  }

  getMany(
    pagination: PaginationArgs,
    order: ActivityOrder,
    filter: { userId: string },
  ): Observable<ActivityConnection> {
    return {} as Observable<ActivityConnection>;
  }
}
