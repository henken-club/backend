import { Injectable } from "@nestjs/common";

import { BookSeriesPart } from "~/entities/bookseries-parts.entities";

@Injectable()
export class BookSeriesPartsService {
  constructor() {}

  async getById(id: string): Promise<BookSeriesPart> {
    return {} as BookSeriesPart;
  }
}
