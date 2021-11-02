import { BadRequestException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { map, Observable } from "rxjs";

import {
  SearchContentFilterType,
  SearchContentsArgs,
  SearchContentsPayload,
} from "./dto/search-content.dto";

import { Content } from "~/entities/content/content.entities";
import { SearchContentResult } from "~/entities/search/search.entities";
import { SearchService } from "~/services/search/search.service";

@Resolver(() => SearchContentResult)
export class SearchContentResolver {
  constructor(private readonly search: SearchService) {}

  @Query((type) => SearchContentsPayload, { name: "searchContents" })
  searchContents(
    @Args() { filter: { type }, skip, limit, query }: SearchContentsArgs,
  ): Observable<SearchContentsPayload> {
    if (type === null) {
      return this.search.searchContentMixed(query, { skip, limit }).pipe(
        map((val) => ({
          results: val.results
            .filter((value): value is Content => value !== null)
            .map(({ id, type }) => ({
              content: { id, type },
            })),
        })),
      );
    }
    switch (type) {
      case SearchContentFilterType.AUTHOR:
        return this.search.searchAuthors(query, { skip, limit }).pipe(
          map((val) => ({
            results: val.results.map(({ id }) => ({
              content: { id, type: "AUTHOR" },
            })),
          })),
        );
      case SearchContentFilterType.BOOK:
        return this.search.searchBooks(query, { skip, limit }).pipe(
          map((val) => ({
            results: val.results.map(({ id }) => ({
              content: { id, type: "BOOK" },
            })),
          })),
        );
      case SearchContentFilterType.BOOK_SERIES:
        return this.search.searchBookSeries(query, { skip, limit }).pipe(
          map((val) => ({
            results: val.results.map(({ id }) => ({
              content: { id, type: "BOOK_SERIES" },
            })),
          })),
        );
    }
    throw new BadRequestException();
  }
}
