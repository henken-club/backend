import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MeiliSearchConfig } from "./meilisearch.config";
import { MeiliSearchService } from "./meilisearch.service";

@Module({
  imports: [ConfigModule.forFeature(MeiliSearchConfig)],
  providers: [MeiliSearchService],
  exports: [MeiliSearchService],
})
export class MeiliSearchModule {}
