import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

import { AccountsService } from "./accounts.service";

@Module({
  imports: [GrpcClientsModule],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
