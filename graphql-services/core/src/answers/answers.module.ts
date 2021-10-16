import { Module } from "@nestjs/common";

import { AnswersService } from "./answers.service";

import { HenkensModule } from "~/henkens/henkens.module";
import { PrismaModule } from "~/prisma/prisma.module";

@Module({
  imports: [PrismaModule, HenkensModule],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
