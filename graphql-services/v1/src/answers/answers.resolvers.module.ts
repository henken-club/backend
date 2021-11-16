import { Module } from "@nestjs/common";

import { AnswerEdgesResolver } from "./resolvers/answer-edges.resolver";
import { AnswersResolver } from "./resolvers/answers.resolver";

import { AnswersModule } from "~/answers/answers.module";
import { HenkensModule } from "~/henkens/henkens.module";

@Module({
  imports: [AnswersModule, HenkensModule],
  providers: [AnswersResolver, AnswerEdgesResolver],
})
export class AnswersResolversModule {}
