import { Module } from "@nestjs/common";

import { ActivitiesEdgesResolver } from "./activities-edges.resolver";
import { ActivitiesResolver } from "./activities.resolver";
import { ReceivedAnswerActivitiesResolver } from "./received-answer-activities.resolver";
import { ReceivedHenkenActivitiesResolver } from "./received-henken-activities.resolver";

import {
  PostAnswerActivity,
  PostHenkenActivity,
} from "~/entities/activity.entities";
import { ActivitiesModule } from "~/services/activities/activities.module";
import { AnswersModule } from "~/services/answers/answers.module";
import { HenkensModule } from "~/services/henkens/henkens.module";

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
