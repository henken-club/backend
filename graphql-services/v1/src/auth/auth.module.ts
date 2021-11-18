import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AccountsModule } from "~/account/accounts.module";

@Module({
  imports: [AccountsModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
