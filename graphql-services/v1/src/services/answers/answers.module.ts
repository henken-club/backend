import { Module } from "@nestjs/common";

import { AnswersService } from "./answers.service";

@Module({
  imports: [],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
