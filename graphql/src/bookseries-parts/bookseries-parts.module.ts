import { Module } from "@nestjs/common";

import { BookSeriesPartsService } from "./bookseries-parts.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

@Module({
  imports: [GrpcClientsModule],
  providers: [BookSeriesPartsService],
  exports: [BookSeriesPartsService],
})
export class BookSeriesPartsModule {}
