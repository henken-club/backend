import { Resolver } from "@nestjs/graphql";

import { Activity } from "~/activities/activities.entities";
import { ActivitiesService } from "~/activities/services/activities.service";

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(
    private readonly activities: ActivitiesService,
  ) {}
}
