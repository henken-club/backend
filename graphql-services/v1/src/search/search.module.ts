import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

import { SearchService } from "./search.service";

@Module({
  imports: [GrpcClientsModule],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
