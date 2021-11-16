import { Module } from "@nestjs/common";

import { HenkensService } from "./henkens.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";
import { PaginationModule } from "~/pagination/pagination.module";
import { TimestampModule } from "~/timestamp/timestamp.module";

@Module({
  imports: [
    GrpcClientsModule,
    TimestampModule,
    PaginationModule,
  ],
  providers: [HenkensService],
  exports: [HenkensService],
})
export class HenkensModule {}
