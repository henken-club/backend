import { Resolver } from "@nestjs/graphql";

import { Activity } from "~/entities/activity.entities";
import { ActivitiesService } from "~/services/activities/activities.service";

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(
    private readonly activities: ActivitiesService,
  ) {}
}
