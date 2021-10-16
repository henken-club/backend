import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { MeiliSearch } from "meilisearch";

import { MeiliSearchConfig } from "./meilisearch.config";

@Injectable()
export class MeiliSearchService {
  private readonly client: MeiliSearch;

  constructor(
    @Inject(MeiliSearchConfig.KEY) private readonly config: ConfigType<
      typeof MeiliSearchConfig
    >,
  ) {
    this.client = new MeiliSearch({ host: this.config.host });
  }

  addDocument<T extends { id: string }>(index: string, document: T) {
    return this.client.index(index).updateDocuments([document]);
  }

  searchDocuments<T extends Record<string, unknown>>(
    index: string,
    query: string,
    option: { offset: number; limit: number },
  ) {
    return this.client.index(index).search<T>(query, { ...option });
  }
}
