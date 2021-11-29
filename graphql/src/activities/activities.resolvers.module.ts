import { Module } from "@nestjs/common";

import { PostAnswerActivity, PostHenkenActivity } from "./activities.entities";
import { ActivitiesModule } from "./activities.module";
import { ActivitiesEdgesResolver } from "./resolvers/activities-edges.resolver";
import { ActivitiesResolver } from "./resolvers/activities.resolver";
import { ReceivedAnswerActivitiesResolver } from "./resolvers/received-answer-activities.resolver";
import { ReceivedHenkenActivitiesResolver } from "./resolvers/received-henken-activities.resolver";

import { AnswersModule } from "~/answers/answers.module";
import { HenkensModule } from "~/henkens/henkens.module";

@Module({
  imports: [ActivitiesModule, HenkensModule, AnswersModule],
  providers: [
    ActivitiesResolver,
    ActivitiesEdgesResolver,
    PostAnswerActivity,
    PostHenkenActivity,
    ReceivedAnswerActivitiesResolver,
    ReceivedHenkenActivitiesResolver,
  ],
})
export class ActivitiesResolversModule {}
