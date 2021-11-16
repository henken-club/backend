import { Module } from "@nestjs/common";

import { ActivitiesEdgesResolver } from "./activities-edges.resolver";
import { ActivitiesResolver } from "./activities.resolver";
import { ReceivedAnswerActivitiesResolver } from "./received-answer-activities.resolver";
import { ReceivedHenkenActivitiesResolver } from "./received-henken-activities.resolver";

import { ActivitiesModule } from "~/activities/activities.module";
import {
  PostAnswerActivity,
  PostHenkenActivity,
} from "~/activities/activity.entities";
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
