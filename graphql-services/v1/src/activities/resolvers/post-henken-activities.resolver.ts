import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { PostHenkenActivity } from "~/activities/activities.entities";
import { Henken } from "~/henkens/henken.entities";
import { HenkensService } from "~/henkens/henkens.service";

@Resolver(() => PostHenkenActivity)
export class PostHenkenActivitiesResolver {
  constructor(private readonly henkens: HenkensService) {}

  @ResolveField(() => Henken, { name: "henken" })
  resolveHenken(@Parent() { henkenId }: PostHenkenActivity) {
    return this.henkens.getById(henkenId);
  }
}
