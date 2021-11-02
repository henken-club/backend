import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountsService {
  constructor() {}

  async isUserExists(accountId: string): Promise<boolean> {
    return false;
  }

  async getUserId(accountId: string): Promise<string | null> {
    return "";
  }
}
