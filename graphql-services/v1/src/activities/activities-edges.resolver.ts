import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { ActivitiesService } from "~/activities/activities.service";
import { Activity, ActivityEdge } from "~/activities/activity.entities";

@Resolver(() => ActivityEdge)
export class ActivitiesEdgesResolver {
  constructor(private readonly activities: ActivitiesService) {}

  @ResolveField((type) => Activity, { name: "node" })
  resolveNode(@Parent() { node }: ActivityEdge): Observable<Activity> {
    return this.activities.getById(node.id);
  }
}
