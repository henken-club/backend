import { Injectable } from "@nestjs/common";

import {
  AuthorDocument,
  BookSeriesDocument,
  ContentDocument,
} from "~/meilisearch/meilisearch.documents";
import { MeiliSearchService } from "~/meilisearch/meilisearch.service";

@Injectable()
export class SearcherService {
  constructor(private readonly meilisearch: MeiliSearchService) {}

  async searchFromContent(
    query: string,
    option: { offset: number; limit: number },
  ) {
    return this.meilisearch
      .searchDocuments<ContentDocument>("content", query, option)
      .then(({ hits }) => hits.map(({ id, type }) => ({ id, type })));
  }

  async searchFromAuthor(
    query: string,
    option: { offset: number; limit: number },
  ) {
    return this.meilisearch
      .searchDocuments<AuthorDocument>("author", query, option)
      .then(({ hits }) => hits.map(({ id }) => ({ id })));
  }

  async searchFromBook(
    query: string,
    option: { offset: number; limit: number },
  ) {
    return this.meilisearch
      .searchDocuments<AuthorDocument>("book", query, option)
      .then(({ hits }) => hits.map(({ id }) => ({ id })));
  }

  async searchFromBookSeries(
    query: string,
    option: { offset: number; limit: number },
  ) {
    return this.meilisearch
      .searchDocuments<BookSeriesDocument>("bookseries", query, option)
      .then(({ hits }) => hits.map(({ id }) => ({ id })));
  }
}
