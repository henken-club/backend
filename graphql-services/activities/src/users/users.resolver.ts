import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { ActivityConnectionEntity } from "../activities/activity.entities";

import { UserActivitiesArgs } from "./dto/users-activities.dto";
import { UserEntity } from "./user.entities";

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor() {}

  @ResolveField((type) => ActivityConnectionEntity, { name: "activities" })
  async activities(
    @Parent() { id }: UserEntity,
    @Args({ type: () => UserActivitiesArgs }) { orderBy, ...pagination }:
      UserActivitiesArgs,
  ): Promise<ActivityConnectionEntity> {
    return {
      totalCount: 0,
      edges: [],
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
    };
  }
}
