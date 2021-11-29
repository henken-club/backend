import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { GrpcClientClientConfig } from "./grpc-clients.config";

@Module({
  imports: [
    ClientsModule.registerAsync(
      [
        {
          name: "GrpcCoreClient",
          imports: [ConfigModule.forFeature(GrpcClientClientConfig)],
          inject: [GrpcClientClientConfig.KEY],
          useFactory: async (
            config: ConfigType<typeof GrpcClientClientConfig>,
          ) => ({
            transport: Transport.GRPC,
            options: config.core.client.options,
          }),
        },
        {
          name: "GrpcContentClient",
          imports: [ConfigModule.forFeature(GrpcClientClientConfig)],
          inject: [GrpcClientClientConfig.KEY],
          useFactory: async (
            config: ConfigType<typeof GrpcClientClientConfig>,
          ) => ({
            transport: Transport.GRPC,
            options: config.content.client.options,
          }),
        },
        {
          name: "GrpcSearchClient",
          imports: [ConfigModule.forFeature(GrpcClientClientConfig)],
          inject: [GrpcClientClientConfig.KEY],
          useFactory: async (
            config: ConfigType<typeof GrpcClientClientConfig>,
          ) => ({
            transport: Transport.GRPC,
            options: config.search.client.options,
          }),
        },
        {
          name: "GrpcBookcoverClient",
          imports: [ConfigModule.forFeature(GrpcClientClientConfig)],
          inject: [GrpcClientClientConfig.KEY],
          useFactory: async (
            config: ConfigType<typeof GrpcClientClientConfig>,
          ) => ({
            transport: Transport.GRPC,
            options: config.bookcover.client.options,
          }),
        },
      ],
    ),
  ],
  exports: [ClientsModule],
})
export class GrpcClientsModule {}
