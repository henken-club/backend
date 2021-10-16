import { Module } from "@nestjs/common";

import { AnswersModule } from "./answers.module";
import { AnswerEdgesResolver, AnswersResolver } from "./answers.resolver";

import { HenkensModule } from "~/henkens/henkens.module";

@Module({
  imports: [AnswersModule, HenkensModule],
  providers: [AnswersResolver, AnswerEdgesResolver],
})
export class AnswersResolverModule {}
