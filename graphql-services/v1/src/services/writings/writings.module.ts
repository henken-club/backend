import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { PaginationModule } from "../pagination/pagination.module";

import { WritingsConfig } from "./writings.config";
import { WritingsService } from "./writings.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "ContentGrpcClient",
        imports: [ConfigModule.forFeature(WritingsConfig)],
        inject: [WritingsConfig.KEY],
        useFactory: async (config: ConfigType<typeof WritingsConfig>) => ({
          transport: Transport.GRPC,
          options: config.client.options,
        }),
      },
    ]),
    PaginationModule,
  ],
  providers: [WritingsService],
  exports: [WritingsService],
})
export class WritingsModule {}
