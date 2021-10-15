import { Module } from "@nestjs/common";

import { SearcherModule } from "./searcher/searcher.module";
import { UpserterModule } from "./upserter/upserter.module";

@Module({
  imports: [UpserterModule, SearcherModule],
})
export class AppModule {}
