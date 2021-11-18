import { Module } from "@nestjs/common";

import { FollowingsModule } from "./followings.module";
import { FollowingEdgesResolver } from "./resolvers/following-edges.resolver";
import { FollowingsResolver } from "./resolvers/followings.resolver";

import { UsersModule } from "~/users/users.module";

@Module({
  imports: [FollowingsModule, UsersModule],
  providers: [
    FollowingsResolver,
    FollowingEdgesResolver,
  ],
})
export class FollowingsResolversModule {}
