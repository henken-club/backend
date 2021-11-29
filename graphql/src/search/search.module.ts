import { Module } from "@nestjs/common";

import { SearchService } from "./search.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

@Module({
  imports: [GrpcClientsModule],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
