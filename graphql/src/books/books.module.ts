import { Module } from "@nestjs/common";

import { BooksService } from "./books.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";
import { PaginationModule } from "~/pagination/pagination.module";

@Module({
  imports: [GrpcClientsModule, PaginationModule],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
