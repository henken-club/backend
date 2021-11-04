import { Module } from "@nestjs/common";

import { TimestampModule } from "../timestamp/timestamp.module";

import { AnswersService } from "./answers.service";

@Module({
  imports: [TimestampModule],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
