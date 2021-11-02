import { Injectable } from "@nestjs/common";

import { Book } from "~/entities/content/books.entities";

@Injectable()
export class BooksService {
  constructor() {}

  async getById(id: string): Promise<Book> {
    return {} as Book;
  }

  async findById(
    id: string,
  ): Promise<Book | null> {
    return {} as Book;
  }
}
