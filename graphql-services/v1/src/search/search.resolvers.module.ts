import { Module } from "@nestjs/common";

import { SearchContentResolver } from "./resolvers/search-content.resolver";
import { SearchUserResolver } from "./resolvers/search-users.resolver";
import { SearchModule } from "./search.module";

import { UsersModule } from "~/users/users.module";

@Module({
  imports: [SearchModule, UsersModule],
  providers: [SearchContentResolver, SearchUserResolver],
})
export class SearchResolversModule {}
