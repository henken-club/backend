import { Module } from "@nestjs/common";

import { AnswerEdgesResolver } from "./answer-edges.resolver";
import { AnswersResolver } from "./answers.resolver";

import { AnswersModule } from "~/services/answers/answers.module";
import { HenkensModule } from "~/services/henkens/henkens.module";

@Module({
  imports: [AnswersModule, HenkensModule],
  providers: [AnswersResolver, AnswerEdgesResolver],
})
export class AnswersResolversModule {}
