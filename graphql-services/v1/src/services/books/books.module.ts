import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { PaginationModule } from "../pagination/pagination.module";

import { BooksConfig } from "./books.config";
import { BooksService } from "./books.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "GrpcContentClient",
        imports: [ConfigModule.forFeature(BooksConfig)],
        inject: [BooksConfig.KEY],
        useFactory: async (config: ConfigType<typeof BooksConfig>) => ({
          transport: Transport.GRPC,
          options: config.client.options,
        }),
      },
    ]),
    PaginationModule,
  ],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
