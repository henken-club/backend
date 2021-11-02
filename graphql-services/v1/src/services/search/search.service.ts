import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { Content } from "~/entities/content/content.entities";
import {
  SearchAllResponse_SearchResultType,
  SEARCHER_SERVICE_NAME,
  SearcherClient,
} from "~/protogen/search/searcher";

@Injectable()
export class SearchService implements OnModuleInit {
  private searcher!: SearcherClient;

  constructor(
    @Inject("SearchGrpcClient") private readonly grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.searcher = this.grpcClient.getService<SearcherClient>(
      SEARCHER_SERVICE_NAME,
    );
  }

  searchContentMixed(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ): Observable<{ results: (Content | null)[] }> {
    return this.searcher.searchAll({ query, skip, limit }).pipe(
      map(({ results }) => ({
        results: results.map(({ id, type }) => {
          switch (type) {
            case SearchAllResponse_SearchResultType.AUTHOR:
              return { id, type: "AUTHOR" };
            case SearchAllResponse_SearchResultType.BOOK:
              return { id, type: "BOOK" };
            case SearchAllResponse_SearchResultType.BOOK_SERIES:
              return { id, type: "BOOK_SERIES" };
            default:
              return null;
          }
        }),
      })),
    );
  }

  searchAuthors(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ) {
    return this.searcher.searchAuthor({ query, skip, limit });
  }

  searchBooks(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ) {
    return this.searcher.searchBook({ query, skip, limit });
  }

  searchBookSeries(
    query: string,
    { skip, limit }: { skip: number; limit: number },
  ) {
    return this.searcher.searchBookSeries({ query, skip, limit });
  }
}
