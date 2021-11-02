import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { GraphQLFederationModule } from "@nestjs/graphql";

import { AppConfig } from "./app.config";
import { HealthModule } from "./health/health.module";
import { AnswersResolversModule } from "./resolvers/answers/answers.resolvers.module";
import { HenkensResolversModule } from "./resolvers/henkens/henkens.resolvers.module";

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
    AnswersResolversModule,
    HenkensResolversModule,
  ],
})
export class AppModule {}
