import { Module } from "@nestjs/common";

import { AccountsService } from "./accounts.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

@Module({
  imports: [GrpcClientsModule],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
