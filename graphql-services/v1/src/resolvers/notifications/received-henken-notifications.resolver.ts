import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Henken } from "~/entities/henken.entities";
import { ReceivedHenkenNotification } from "~/entities/notification.entities";
import { HenkensService } from "~/services/henkens/henkens.service";

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
