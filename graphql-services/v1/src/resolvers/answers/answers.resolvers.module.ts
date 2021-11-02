import { Module } from "@nestjs/common";

import { AnswerEdgesResolver, AnswersResolver } from "./answers.resolver";

import { AnswersModule } from "~/services/answers/answers.module";

@Module({
  imports: [AnswersModule],
  providers: [AnswersResolver, AnswerEdgesResolver],
})
export class AnswersResolversModule {}
