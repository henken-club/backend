import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { GraphQLFederationModule } from "@nestjs/graphql";

import { AppConfig } from "./app.config";
import { ContentResolversModule } from "./contents/resolvers.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    HealthModule,
    GraphQLFederationModule.forRootAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      inject: [AppConfig.KEY],
      useFactory: (config: ConfigType<typeof AppConfig>) => ({
        ...config.graphql,
      }),
    }),
    ContentResolversModule,
  ],
})
export class AppModule {}
