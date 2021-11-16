import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

import { PaginationModule } from "~/pagination/pagination.module";

import { BooksService } from "./books.service";

@Module({
  imports: [GrpcClientsModule, PaginationModule],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
