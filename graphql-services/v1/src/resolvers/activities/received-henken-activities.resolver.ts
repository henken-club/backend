import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { ReceivedHenkenActivity } from "~/entities/activity.entities";
import { Henken } from "~/entities/henken.entities";
import { HenkensService } from "~/services/henkens/henkens.service";

@Resolver(() => ReceivedHenkenActivity)
export class ReceivedHenkenActivitiesResolver {
  constructor(private readonly henkens: HenkensService) {}

  @ResolveField(() => Henken, { name: "henken" })
  resolveHenken(@Parent() { henkenId }: ReceivedHenkenActivity) {
    return this.henkens.getById(henkenId);
  }
}
