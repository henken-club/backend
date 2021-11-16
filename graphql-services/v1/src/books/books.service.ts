import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { PaginationService } from "~/pagination/pagination.service";

import {
  Book,
  BookConnection,
  BookOrder,
  BookOrderField,
} from "./books.entities";

import { ContentType } from "~/content/content.entities";
import { PaginationArgs } from "~/pagination/pagination.entities";
import {
  BOOKCOVER_SERVICE_NAME,
  BookcoverClient,
} from "~/protogen/bookcover/bookcover";
import {
  BOOK_SERVICE_NAME,
  BookClient,
  BookOrderField as GrpcBookOrderField,
} from "~/protogen/content/book";

@Injectable()
export class BooksService {
  private bookClient!: BookClient;
  private bookcoverClient!: BookcoverClient;

  constructor(
    @Inject("GrpcContentClient") private readonly grpcContentClient: ClientGrpc,
    @Inject("GrpcBookcoverClient") private readonly grpcBookcoverClient:
      ClientGrpc,
    private readonly pagination: PaginationService,
  ) {
    this.bookClient = this.grpcContentClient
      .getService<BookClient>(
        BOOK_SERVICE_NAME,
      );
    this.bookcoverClient = this.grpcBookcoverClient
      .getService<BookcoverClient>(
        BOOKCOVER_SERVICE_NAME,
      );
  }

  getById(id: string): Observable<Book> {
    return this.bookClient.getBook({ id })
      .pipe(
        map(({ book }) => {
          if (!book) {
            throw new Error();
          }
          return ({
            ...book,
            type: ContentType.BOOK,
            title: book.name,
            isbn: book.isbn || null,
          });
        }),
      );
  }

  convertGrpcBookOrderField(direction: BookOrderField): GrpcBookOrderField {
    switch (direction) {
      case BookOrderField.NAME:
        return GrpcBookOrderField.NAME;
      default:
        throw new Error("Invalid order direction");
    }
  }

  convertGrpcBookOrder({ direction, field }: BookOrder) {
    return {
      direction: this.pagination.convertGrpcOrderDirection(direction),
      field: this.convertGrpcBookOrderField(field),
    };
  }

  getMany(
    pagination: PaginationArgs,
    order: BookOrder,
  ): Observable<BookConnection> {
    const convertedPagination = this.pagination.convertGrpcPagination(
      pagination,
    );
    const convertedOrder = this.convertGrpcBookOrder(order);
    return this.bookClient.manyBooks({
      ...convertedPagination,
      order: convertedOrder,
    })
      .pipe(
        map(({ connection }) => {
          if (!connection) {
            throw new Error();
          }
          if (!connection.edges) {
            throw new Error();
          }
          if (!connection.pageInfo) {
            throw new Error();
          }
          if (!connection.totalCount) {
            throw new Error();
          }
          return ({
            edges: connection.edges.map(({ node, cursor }) => {
              if (!node) {
                throw new Error();
              }

              return ({ node, cursor });
            }),
            pageInfo: connection.pageInfo,
            totalCount: connection.totalCount,
          });
        }),
      );
  }

  findBookcoverFromISBN(isbn: string): Observable<string | null> {
    return this.bookcoverClient.findFromISBN({ isbn }).pipe(
      map(({ url }) => url || null),
    );
  }
}
