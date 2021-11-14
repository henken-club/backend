import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AccountsModule } from "~/services/account/accounts.module";

@Module({
  imports: [AccountsModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
