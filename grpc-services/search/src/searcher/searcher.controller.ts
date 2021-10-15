import { Controller } from "@nestjs/common";

import { SearcherService } from "./searcher.service";

import { ContentDocument } from "~/meilisearch/meilisearch.documents";
import {
  FilteredSearchResponse,
  HENKENCLUB_SEARCH_V1_PACKAGE_NAME,
  SearchAllRequest,
  SearchAllResponse,
  SearchAllResponse_SearchResultType,
  SearchAuthorRequest,
  SearchBookRequest,
  SearchBookSeriesRequest,
  SearcherController as SearcherControllerInterface,
  SearcherControllerMethods,
} from "~/protogen/searcher";

@SearcherControllerMethods()
@Controller(HENKENCLUB_SEARCH_V1_PACKAGE_NAME)
export class SearcherController implements SearcherControllerInterface {
  constructor(private readonly searcher: SearcherService) {}

  async searchAll({
    query,
    limit,
    skip,
  }: SearchAllRequest): Promise<SearchAllResponse> {
    return this.searcher
      .searchFromContent(query, {
        offset: skip,
        limit,
      })
      .then((hits) => (
        hits.map(({ id, type }) => ({
          id,
          type: this.serializeContentType(type),
        }))
      ))
      .then((hits) => ({ results: hits }));
  }

  async searchAuthor({
    query,
    limit,
    skip,
  }: SearchAuthorRequest): Promise<FilteredSearchResponse> {
    return this.searcher
      .searchFromAuthor(query, {
        offset: skip,
        limit,
      })
      .then((hits) => ({ results: hits }));
  }

  async searchBook({
    query,
    limit,
    skip,
  }: SearchBookRequest): Promise<FilteredSearchResponse> {
    return this.searcher
      .searchFromBook(query, {
        offset: skip,
        limit,
      })
      .then((hits) => ({ results: hits }));
  }

  async searchBookSeries({
    query,
    limit,
    skip,
  }: SearchBookSeriesRequest): Promise<FilteredSearchResponse> {
    return this.searcher
      .searchFromBookSeries(query, {
        offset: skip,
        limit,
      })
      .then((hits) => ({ results: hits }));
  }

  private serializeContentType(type: ContentDocument["type"]) {
    switch (type) {
      case "author":
        return SearchAllResponse_SearchResultType.AUTHOR;
      case "book":
        return SearchAllResponse_SearchResultType.BOOK;
      case "bookseries":
        return SearchAllResponse_SearchResultType.BOOK_SERIES;
      default:
        return SearchAllResponse_SearchResultType.UNKNOWN;
    }
  }
}
