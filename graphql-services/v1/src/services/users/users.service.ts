import { Injectable } from "@nestjs/common";

import { User } from "~/entities/user.entities";

@Injectable()
export class UsersService {
  constructor() {}

  async getById(id: string): Promise<User> {
    return {} as User;
  }

  async findById(id: string): Promise<User | null> {
    return {} as User;
  }

  async findByAlias(alias: string): Promise<User | null> {
    return {} as User;
  }
}
