import { Module } from "@nestjs/common";

import { FollowingEdgesResolver } from "./following-edges.resolver";
import { FollowingsModule } from "./followings.module";
import { FollowingsResolver } from "./followings.resolver";

import { UsersModule } from "~/users/users.module";

@Module({
  imports: [FollowingsModule, UsersModule],
  providers: [
    FollowingsResolver,
    FollowingEdgesResolver,
  ],
})
export class FollowingsResolversModule {}
