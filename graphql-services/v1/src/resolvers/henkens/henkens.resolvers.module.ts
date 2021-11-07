import { Module } from "@nestjs/common";

import { HenkenEdgesResolver } from "./henken-edges.resolver";
import { HenkensResolver } from "./henkens.resolver";

import { AccountsModule } from "~/services/account/accounts.module";
import { AnswersModule } from "~/services/answers/answers.module";
import { HenkensModule } from "~/services/henkens/henkens.module";
import { UsersModule } from "~/services/users/users.module";

@Module({
  imports: [HenkensModule, UsersModule, AnswersModule, AccountsModule],
  providers: [HenkensResolver, HenkenEdgesResolver],
})
export class HenkensResolversModule {}
