import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "../grpc-clients/grpc-clients.module";

import { BookSeriesPartsService } from "./bookseries-parts.service";

@Module({
  imports: [GrpcClientsModule],
  providers: [BookSeriesPartsService],
  exports: [BookSeriesPartsService],
})
export class BookSeriesPartsModule {}
