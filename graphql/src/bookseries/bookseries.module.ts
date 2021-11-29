import { Module } from "@nestjs/common";

import { BookSeriesService } from "./bookseries.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

@Module({
  imports: [GrpcClientsModule],
  providers: [BookSeriesService],
  exports: [BookSeriesService],
})
export class BookSeriesModule {}
