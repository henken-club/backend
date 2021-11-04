import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { TimestampModule } from "../timestamp/timestamp.module";

import { HenkensConfig } from "./henkens.config";
import { HenkensService } from "./henkens.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "CoreGrpcClient",
        imports: [ConfigModule.forFeature(HenkensConfig)],
        inject: [HenkensConfig.KEY],
        useFactory: async (config: ConfigType<typeof HenkensConfig>) => ({
          transport: Transport.GRPC,
          options: config.client.options,
        }),
      },
    ]),
    TimestampModule,
  ],
  providers: [HenkensService],
  exports: [HenkensService],
})
export class HenkensModule {}
