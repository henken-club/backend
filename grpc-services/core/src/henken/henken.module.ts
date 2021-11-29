import { Module } from "@nestjs/common";

import { HenkenController } from "./henken.controller";
import { HenkensService } from "./henken.service";

import { PrismaModule } from "~/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [HenkenController],
  providers: [HenkensService],
  exports: [HenkensService],
})
export class HenkenModule {}
