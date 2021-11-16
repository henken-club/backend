import { Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { ActivitiesResolversModule } from "./activities/activities.resolvers.module";
import { AnswersResolversModule } from "./answers/answers.resolvers.module";
import { AppConfig } from "./app.config";
import { AuthorsResolversModule } from "./authors/authors.resolvers.module";
import { BooksResolversModule } from "./books/books.resolvers.module";
import { BookSeriesPartsResolversModule } from "./bookseries-parts/bookseries-parts.resolvers.module";
import { BookSeriesResolversModule } from "./bookseries/bookseries.resolvers.module";
import { FollowingsResolversModule } from "./followings/followings.resolvers.module";
import { HealthModule } from "./health/health.module";
import { HenkensResolversModule } from "./henkens/henkens.resolvers.module";
import { NotificationsResolversModule } from "./notifications/notifications.resolvers.module";
import { SearchResolversModule } from "./search/search.resolvers.module";
import { UsersResolversModule } from "./users/users.resolvers.module";
import { WritingsResolversModule } from "./writings/writings.resolvers.module";

@Module({
  imports: [
    HealthModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      inject: [AppConfig.KEY],
      useFactory: (config: ConfigType<typeof AppConfig>) => ({
        ...config.graphql,
      }),
    }),
    AnswersResolversModule,
    HenkensResolversModule,
    UsersResolversModule,
    FollowingsResolversModule,
    ActivitiesResolversModule,
    NotificationsResolversModule,
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
