import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { Book } from "~/entities/books.entities";
import { ContentType } from "~/entities/content.entities";
import { BOOK_SERVICE_NAME, BookClient } from "~/protogen/content/book";

@Injectable()
export class BooksService {
  private client!: BookClient;

  constructor(
    @Inject("GrpcContentClient") private readonly grpcClient: ClientGrpc,
  ) {
    this.client = this.grpcClient.getService<BookClient>(BOOK_SERVICE_NAME);
  }

  getById(id: string): Observable<Book> {
    return this.client.getBook({ id })
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
}
