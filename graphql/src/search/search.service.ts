import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { SearchContentResult, SearchUserResult } from "./search.entities";

import { ContentType } from "~/content/content.entities";
import {
  SearchAllResponse_SearchResultType,
  SEARCHER_SERVICE_NAME,
  SearcherClient,
} from "~/protogen/search/searcher";
import { USER_SERVICE_NAME, UserClient } from "~/protogen/search/user";

@Injectable()
export class SearchService implements OnModuleInit {
  private searcher!: SearcherClient;
  private user!: UserClient;

  constructor(
    @Inject("GrpcSearchClient") private readonly grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.searcher = this.grpcClient.getService<SearcherClient>(
      SEARCHER_SERVICE_NAME,
    );
    this.user = this.grpcClient.getService<UserClient>(
      USER_SERVICE_NAME,
    );
  }

  searchContentMixed(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ): Observable<{ results: SearchContentResult<ContentType>[] }> {
    return this.searcher.searchAll({ query, skip, limit }).pipe(
      map(({ results }) => ({
        results: results.map(({ id, type }) => {
          switch (type) {
            case SearchAllResponse_SearchResultType.AUTHOR:
              return { content: { id, type: ContentType.AUTHOR } };
            case SearchAllResponse_SearchResultType.BOOK:
              return { content: { id, type: ContentType.BOOK } };
            case SearchAllResponse_SearchResultType.BOOK_SERIES:
              return { content: { id, type: ContentType.BOOK_SERIES } };
            default:
              throw new Error();
          }
        }),
      })),
    );
  }

  searchAuthor(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ): Observable<{ results: SearchContentResult<ContentType.AUTHOR>[] }> {
    return this.searcher.searchAuthor({ query, skip, limit }).pipe(
      map(({ results }) => ({
        results: results.map(({ id }) => ({
          content: { id, type: ContentType.AUTHOR },
        })),
      })),
    );
  }

  searchBook(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ): Observable<{ results: SearchContentResult<ContentType.BOOK>[] }> {
    return this.searcher.searchBook({ query, skip, limit }).pipe(
      map(({ results }) => ({
        results: results.map(({ id }) => ({
          content: { id, type: ContentType.BOOK },
        })),
      })),
    );
  }

  searchBookSeries(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ): Observable<{ results: SearchContentResult<ContentType.BOOK_SERIES>[] }> {
    return this.searcher.searchBookSeries({ query, skip, limit }).pipe(
      map(({ results }) => ({
        results: results.map(({ id }) => ({
          content: { id, type: ContentType.BOOK_SERIES },
        })),
      })),
    );
  }

  searchUser(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ): Observable<{ results: SearchUserResult[] }> {
    return this.user.searchUser({ query, skip, limit }).pipe(
      map(({ results }) => ({
        results: results.map(({ id }) => ({ userId: id })),
      })),
    );
  }
}
