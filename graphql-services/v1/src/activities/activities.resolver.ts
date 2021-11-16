import { Resolver } from "@nestjs/graphql";

import { ActivitiesService } from "~/activities/activities.service";
import { Activity } from "~/activities/activity.entities";

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(
    private readonly activities: ActivitiesService,
  ) {}
}
