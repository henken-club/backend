import { Module } from "@nestjs/common";

import { HenkenController } from "./henken.controller";

@Module({
  imports: [],
  controllers: [HenkenController],
  providers: [],
  exports: [],
})
export class HenkenModule {}
