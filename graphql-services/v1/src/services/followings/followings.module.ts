import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "../grpc-clients/grpc-clients.module";
import { PaginationModule } from "../pagination/pagination.module";

import { FollowingsService } from "./followings.service";

@Module({
  imports: [GrpcClientsModule, PaginationModule],
  providers: [FollowingsService],
  exports: [FollowingsService],
})
export class FollowingsModule {}
