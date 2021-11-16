import { Module } from "@nestjs/common";

import { SearchContentResolver } from "./search-content.resolver";
import { SearchUserResolver } from "./search-users.resolver";

import { SearchModule } from "~/search/search.module";
import { UsersModule } from "~/users/users.module";

@Module({
  imports: [SearchModule, UsersModule],
  providers: [SearchContentResolver, SearchUserResolver],
})
export class SearchResolversModule {}
