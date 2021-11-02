import { Injectable } from "@nestjs/common";

import { Author } from "~/entities/author.entities";

@Injectable()
export class AuthorsService {
  constructor() {}

  async getById(id: string): Promise<Author> {
    return {} as Author;
  }

  async findById(
    id: string,
  ): Promise<Author | null> {
    return {} as Author;
  }
}
