import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "../grpc-clients/grpc-clients.module";
import { PaginationModule } from "../pagination/pagination.module";

import { WritingsService } from "./writings.service";

@Module({
  imports: [
    GrpcClientsModule,
    PaginationModule,
  ],
  providers: [WritingsService],
  exports: [WritingsService],
})
export class WritingsModule {}
