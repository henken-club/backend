import { Module } from "@nestjs/common";

import { AnswerModule } from "./answer/answer.module";
import { FollowingModule } from "./following/following.module";
import { HenkenModule } from "./henken/henken.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule, AnswerModule, FollowingModule, HenkenModule],
})
export class AppModule {}
