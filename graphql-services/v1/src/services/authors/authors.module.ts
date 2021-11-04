import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AuthorsConfig } from "./authors.config";
import { AuthorsService } from "./authors.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "GrpcContentClient",
        imports: [ConfigModule.forFeature(AuthorsConfig)],
        inject: [AuthorsConfig.KEY],
        useFactory: async (config: ConfigType<typeof AuthorsConfig>) => ({
          transport: Transport.GRPC,
          options: config.client.options,
        }),
      },
    ]),
  ],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
