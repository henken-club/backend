import { Module } from "@nestjs/common";

import { SearcherController } from "./searcher.controller";
import { SearcherService } from "./searcher.service";

import { MeiliSearchModule } from "~/meilisearch/meilisearch.module";

@Module({
  imports: [MeiliSearchModule],
  controllers: [SearcherController],
  providers: [SearcherService],
  exports: [SearcherService],
})
export class SearcherModule {}
