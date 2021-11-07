import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { PostHenkenActivity } from "~/entities/activity.entities";
import { Henken } from "~/entities/henken.entities";
import { HenkensService } from "~/services/henkens/henkens.service";

@Resolver(() => PostHenkenActivity)
export class PostHenkenActivitiesResolver {
  constructor(private readonly henkens: HenkensService) {}

  @ResolveField(() => Henken, { name: "henken" })
  resolveHenken(@Parent() { henkenId }: PostHenkenActivity) {
    return this.henkens.getById(henkenId);
  }
}
