import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Activity, ActivityEdge } from "~/entities/activity.entities";
import { ActivitiesService } from "~/services/activities/activities.service";

@Resolver(() => ActivityEdge)
export class ActivitiesEdgesResolver {
  constructor(private readonly activities: ActivitiesService) {}

  @ResolveField((type) => Activity, { name: "node" })
  resolveNode(@Parent() { node }: ActivityEdge): Observable<Activity> {
    return this.activities.getById(node.id);
  }
}
