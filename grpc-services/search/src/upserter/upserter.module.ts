import { Module } from "@nestjs/common";

import { UpserterController } from "./upserter.controller";
import { UpserterService } from "./upserter.service";

import { MeiliSearchModule } from "~/meilisearch/meilisearch.module";

@Module({
  imports: [MeiliSearchModule],
  controllers: [UpserterController],
  providers: [UpserterService],
  exports: [UpserterService],
})
export class UpserterModule {}
