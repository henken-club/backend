import { Injectable } from "@nestjs/common";

import { Writing } from "~/entities/content/writings.entities";

@Injectable()
export class WritingsService {
  constructor() {}

  async getById(id: string): Promise<Writing> {
    return {} as Writing;
  }
}
