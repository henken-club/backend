import { Injectable } from "@nestjs/common";

import { MeiliSearchService } from "~/meilisearch/meilisearch.service";

@Injectable()
export class UpserterService {
  constructor(private readonly meilisearch: MeiliSearchService) {}

  async upsertContent(
    type: "book" | "bookseries" | "author",
    id: string,
    data: { [key in string]: string | string[] },
  ) {
    return this.meilisearch.addDocument("content", { id, type, data });
  }

  async upsertAuthor(
    { id, name }: { id: string; name: string },
  ): Promise<boolean> {
    return Promise.all([
      this.upsertContent("author", id, { name }),
      this.meilisearch.addDocument("author", { id, name }),
    ])
      .then(() => true)
      .catch(() => false);
  }

  async upsertBook(
    { id, title }: { id: string; title: string },
  ): Promise<boolean> {
    return Promise.all([
      this.upsertContent("book", id, { title }),
      this.meilisearch.addDocument("book", { id, title }),
    ])
      .then(() => true)
      .catch(() => false);
  }

  async upsertBookSeries({
    id,
    title,
  }: {
    id: string;
    title: string;
  }): Promise<boolean> {
    return Promise.all([
      this.upsertContent("bookseries", id, { title }),
      this.meilisearch.addDocument("bookseries", { id, title }),
    ])
      .then(() => true)
      .catch(() => false);
  }
}
