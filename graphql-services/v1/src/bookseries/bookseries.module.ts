import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

import { BookSeriesService } from "./bookseries.service";

@Module({
  imports: [GrpcClientsModule],
  providers: [BookSeriesService],
  exports: [BookSeriesService],
})
export class BookSeriesModule {}
