import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

import { UsersService } from "./users.service";

import { PaginationModule } from "~/pagination/pagination.module";

@Module({
  imports: [GrpcClientsModule, PaginationModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
