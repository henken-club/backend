import { Injectable } from "@nestjs/common";

import { Henken } from "~/entities/henken.entities";

@Injectable()
export class HenkensService {
  constructor() {}

  async getById(id: string): Promise<Henken> {
    return {} as Henken;
  }

  async findById(id: string): Promise<Henken | null> {
    return {} as Henken;
  }
}
