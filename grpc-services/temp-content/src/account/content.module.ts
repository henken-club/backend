import { Module } from "@nestjs/common";

import { ContentController } from "./content.controller";

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [],
  exports: [],
})
export class ContentModule {}
