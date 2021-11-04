import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { BookSeriesConfig } from "./bookseries.config";
import { BookSeriesService } from "./bookseries.service";

@Module({
  imports: [ClientsModule.registerAsync([
    {
      name: "GrpcContentClient",
      imports: [ConfigModule.forFeature(BookSeriesConfig)],
      inject: [BookSeriesConfig.KEY],
      useFactory: async (config: ConfigType<typeof BookSeriesConfig>) => ({
        transport: Transport.GRPC,
        options: config.client.options,
      }),
    },
  ])],
  providers: [BookSeriesService],
  exports: [BookSeriesService],
})
export class BookSeriesModule {}
