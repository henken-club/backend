import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { GraphQLFederationModule } from "@nestjs/graphql";

import { AppConfig } from "./app.config";
import { HealthModule } from "./health/health.module";
import { AnswersResolversModule } from "./resolvers/answers/answers.resolvers.module";
import { AuthorsResolversModule } from "./resolvers/authors/authors.resolvers.module";
import { BooksResolversModule } from "./resolvers/books/books.resolvers.module";
import { BookSeriesPartsResolversModule } from "./resolvers/bookseries-parts/bookseries-parts.resolvers.module";
import { BookSeriesResolversModule } from "./resolvers/bookseries/bookseries.resolvers.module";
import { HenkensResolversModule } from "./resolvers/henkens/henkens.resolvers.module";
import { SearchResolversModule } from "./resolvers/search/search.resolvers.module";
import { UsersResolversModule } from "./resolvers/users/users.resolvers.module";
import { WritingsResolversModule } from "./resolvers/writings/writings.resolvers.module";

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
    UsersResolversModule,
    SearchResolversModule,
    // content
    BooksResolversModule,
    BookSeriesResolversModule,
    AuthorsResolversModule,
    WritingsResolversModule,
    BookSeriesPartsResolversModule,
  ],
})
export class AppModule {}