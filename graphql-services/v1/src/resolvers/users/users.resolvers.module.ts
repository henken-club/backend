import { Module } from "@nestjs/common";

import { UserEdgesResolver } from "./user-edges.resolver";
import { UsersResolver } from "./users.resolver";

import { AccountsModule } from "~/services/account/accounts.module";
import { UsersModule } from "~/services/users/users.module";

@Module({
  imports: [
    UsersModule,
    AccountsModule,
  ],
  providers: [
    UsersResolver,
    UserEdgesResolver,
  ],
})
export class UsersResolversModule {}
