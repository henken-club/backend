import { Injectable } from "@nestjs/common";

import { BookSeries } from "~/entities/content/bookseries.entities";

@Injectable()
export class BookSeriesService {
  constructor() {}

  async getById(id: string): Promise<BookSeries> {
    return {} as BookSeries;
  }

  async findById(
    id: string,
  ): Promise<BookSeries | null> {
    return {} as BookSeries;
  }
}
