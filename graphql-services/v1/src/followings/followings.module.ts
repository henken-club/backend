import { Module } from "@nestjs/common";

import { FollowingsService } from "./followings.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";
import { PaginationModule } from "~/pagination/pagination.module";

@Module({
  imports: [GrpcClientsModule, PaginationModule],
  providers: [FollowingsService],
  exports: [FollowingsService],
})
export class FollowingsModule {}
