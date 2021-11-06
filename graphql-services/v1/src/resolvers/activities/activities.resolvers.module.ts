import { Module } from "@nestjs/common";

import { ActivitiesEdgesResolver } from "./activities-edges.resolver";
import { ActivitiesResolver } from "./activities.resolver";

import { ActivitiesModule } from "~/services/activities/activities.module";

@Module({
  imports: [ActivitiesModule],
  providers: [ActivitiesResolver, ActivitiesEdgesResolver],
})
export class ActivitiesResolversModule {}
