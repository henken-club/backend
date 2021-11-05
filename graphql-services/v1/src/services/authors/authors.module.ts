import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "../grpc-clients/grpc-clients.module";

import { AuthorsService } from "./authors.service";

@Module({
  imports: [GrpcClientsModule],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
