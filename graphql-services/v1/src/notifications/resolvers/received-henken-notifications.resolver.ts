import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { ReceivedHenkenNotification } from "../notification.entities";

import { Henken } from "~/henkens/henken.entities";
import { HenkensService } from "~/henkens/henkens.service";

@Resolver(() => ReceivedHenkenNotification)
export class ReceivedHenkenNotificationsResolver {
  constructor(
    private readonly henkens: HenkensService,
  ) {}

  @ResolveField(() => Henken, { name: "henken" })
  resolveHenken(@Parent() { henkenId }: ReceivedHenkenNotification) {
    return this.henkens.getById(henkenId);
  }
}
