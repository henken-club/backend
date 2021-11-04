import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { PaginationModule } from "../pagination/pagination.module";

import { UsersConfig } from "./users.config";
import { UsersService } from "./users.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "CoreGrpcClient",
        imports: [ConfigModule.forFeature(UsersConfig)],
        inject: [UsersConfig.KEY],
        useFactory: async (config: ConfigType<typeof UsersConfig>) => ({
          transport: Transport.GRPC,
          options: config.client.options,
        }),
      },
    ]),
    PaginationModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
