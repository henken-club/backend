import { Module } from "@nestjs/common";

import { HenkenEdgesResolver } from "./henken-edges.resolver";
import { HenkensResolver } from "./henkens.resolver";

import { AccountsModule } from "~/account/accounts.module";
import { AnswersModule } from "~/answers/answers.module";
import { HenkensModule } from "~/henkens/henkens.module";
import { UsersModule } from "~/users/users.module";

@Module({
  imports: [HenkensModule, UsersModule, AnswersModule, AccountsModule],
  providers: [HenkensResolver, HenkenEdgesResolver],
})
export class HenkensResolversModule {}
