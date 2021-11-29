import { Module } from "@nestjs/common";

import { UsersService } from "./users.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";
import { PaginationModule } from "~/pagination/pagination.module";

@Module({
  imports: [GrpcClientsModule, PaginationModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
