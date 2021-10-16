import {BadRequestException} from '@nestjs/common';
import {Args, Query, Resolver} from '@nestjs/graphql';
import {map, Observable} from 'rxjs';

import {
  SearchContentsArgs,
  SearchContentsFilterType,
  SearchContentsPayload,
} from './dto/search-contents.dto';
import {SearchResultEntity} from './search.entities';
import {SearchService} from './search.service';

import {ContentType} from '~/content/content.entities';

@Resolver(() => SearchResultEntity)
export class SearchResolver {
  constructor(private readonly service: SearchService) {}

  @Query((type) => SearchContentsPayload, {name: 'searchContents'})
  searchContents(
    @Args() {filter: {type}, skip, limit, query}: SearchContentsArgs,
  ): Observable<SearchContentsPayload> {
    if (type === null) {
      return this.service.searchAll(query, {skip, limit}).pipe(
        map((val) => ({
          results: val.results
            .filter(
              (value): value is {id: string; type: ContentType;} =>
                value !== null,
            )
            .map(({id, type}) => ({
              content: {id, type},
            })),
        })),
      );
    }
    switch (type) {
      case SearchContentsFilterType.AUTHOR:
        return this.service.searchAuthors(query, {skip, limit}).pipe(
          map((val) => ({
            results: val.results.map(({id}) => ({
              content: {id, type: 'author'},
            })),
          })),
        );
      case SearchContentsFilterType.BOOK:
        return this.service.searchBooks(query, {skip, limit}).pipe(
          map((val) => ({
            results: val.results.map(({id}) => ({
              content: {id, type: 'book'},
            })),
          })),
        );
      case SearchContentsFilterType.BOOK_SERIES:
        return this.service.searchBookSeries(query, {skip, limit}).pipe(
          map((val) => ({
            results: val.results.map(({id}) => ({
              content: {id, type: 'bookseries'},
            })),
          })),
        );
    }
    throw new BadRequestException();
  }
}
