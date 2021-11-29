import { Module } from "@nestjs/common";

import { AuthorsService } from "./authors.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

@Module({
  imports: [GrpcClientsModule],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
