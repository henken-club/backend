import { Module } from "@nestjs/common";

import { SearchContentResolver } from "./search-content.resolver";

import { SearchModule } from "~/services/search/search.module";

@Module({
  imports: [SearchModule],
  providers: [SearchContentResolver],
  exports: [SearchContentResolver],
})
export class SearchResolversModule {}
