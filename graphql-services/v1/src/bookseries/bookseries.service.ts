import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { BookSeries } from "./bookseries.entities";

import { ContentType } from "~/content/content.entities";
import {
  BOOK_SERIES_SERVICE_NAME,
  BookSeriesClient,
} from "~/protogen/content/bookseries";

@Injectable()
export class BookSeriesService {
  private client!: BookSeriesClient;

  constructor(
    @Inject("GrpcContentClient") private readonly grpcClient: ClientGrpc,
  ) {
    this.client = this.grpcClient.getService<BookSeriesClient>(
      BOOK_SERIES_SERVICE_NAME,
    );
  }

  getById(id: string): Observable<BookSeries> {
    return this.client.getBookSeries({ id })
      .pipe(
        map(({ bookSeries }) => {
          if (!bookSeries) {
            throw new Error();
          }
          return ({
            ...bookSeries,
            type: ContentType.BOOK_SERIES,
            title: bookSeries.name,
          });
        }),
      );
  }
}
