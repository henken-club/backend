import { BadRequestException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import {
  SearchContentArgs,
  SearchContentFilterType,
  SearchContentPayload,
} from "./dto/search-content.dto";

import { SearchContentResult } from "~/entities/search.entities";
import { SearchService } from "~/services/search/search.service";

@Resolver(() => SearchContentResult)
export class SearchContentResolver {
  constructor(private readonly search: SearchService) {}

  @Query((type) => SearchContentPayload, { name: "searchContent" })
  searchContent(
    @Args() {
      filter: { type },
      skip,
      limit,
      query,
    }: SearchContentArgs,
  ): Observable<SearchContentPayload> {
    if (type === null) {
      return this.search.searchContentMixed(query, { skip, limit });
    }
    switch (type) {
      case SearchContentFilterType.AUTHOR:
        return this.search.searchAuthor(query, { skip, limit });
      case SearchContentFilterType.BOOK:
        return this.search.searchBook(query, { skip, limit });
      case SearchContentFilterType.BOOK_SERIES:
        return this.search.searchBookSeries(query, { skip, limit });
    }
    throw new BadRequestException();
  }
}
