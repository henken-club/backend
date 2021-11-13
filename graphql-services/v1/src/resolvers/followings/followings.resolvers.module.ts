import { Module } from "@nestjs/common";

import { FollowingEdgesResolver } from "./following-edges.resolver";
import { FollowingsResolver } from "./followings.resolver";

import { FollowingsModule } from "~/services/followings/followings.module";
import { UsersModule } from "~/services/users/users.module";

@Module({
  imports: [FollowingsModule, UsersModule],
  providers: [
    FollowingsResolver,
    FollowingEdgesResolver,
  ],
})
export class FollowingsResolversModule {}
