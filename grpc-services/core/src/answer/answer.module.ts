import { Module } from "@nestjs/common";

import { AnswerController } from "./answer.controller";

@Module({
  imports: [],
  controllers: [AnswerController],
  providers: [],
  exports: [],
})
export class AnswerModule {}
