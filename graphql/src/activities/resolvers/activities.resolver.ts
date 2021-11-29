import { Resolver } from "@nestjs/graphql";

import { Activity } from "../activities.entities";
import { ActivitiesService } from "../activities.service";

@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(
    private readonly activities: ActivitiesService,
  ) {}
}
