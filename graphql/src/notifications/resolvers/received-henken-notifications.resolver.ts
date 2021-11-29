import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { ReceivedHenkenNotification } from "../notifications.entities";

import { Henken } from "~/henkens/henkens.entities";
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
