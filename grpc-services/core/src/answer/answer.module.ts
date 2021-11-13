import { Module } from "@nestjs/common";

import { AnswerController } from "./answer.controller";
import { AnswersService } from "./answer.service";

import { HenkenModule } from "~/henken/henken.module";
import { PrismaModule } from "~/prisma/prisma.module";

@Module({
  imports: [PrismaModule, HenkenModule],
  controllers: [AnswerController],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswerModule {}
