import { Module } from "@nestjs/common";

import { WritingsService } from "./writings.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";
import { PaginationModule } from "~/pagination/pagination.module";

@Module({
  imports: [
    GrpcClientsModule,
    PaginationModule,
  ],
  providers: [WritingsService],
  exports: [WritingsService],
})
export class WritingsModule {}
