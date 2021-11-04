import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { TimestampModule } from "../timestamp/timestamp.module";

import { AnswersConfig } from "./answers.config";
import { AnswersService } from "./answers.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "CoreGrpcClient",
        imports: [ConfigModule.forFeature(AnswersConfig)],
        inject: [AnswersConfig.KEY],
        useFactory: async (config: ConfigType<typeof AnswersConfig>) => ({
          transport: Transport.GRPC,
          options: config.client.options,
        }),
      },
    ]),
    TimestampModule,
  ],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
