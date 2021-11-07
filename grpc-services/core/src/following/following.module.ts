import { Module } from "@nestjs/common";

import { FollowingController } from "./following.controller";

@Module({
  imports: [],
  controllers: [FollowingController],
  providers: [],
  exports: [],
})
export class FollowingModule {}
