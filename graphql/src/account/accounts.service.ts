import { Injectable } from "@nestjs/common";
import { from, Observable } from "rxjs";

@Injectable()
export class AccountsService {
  constructor() {}

  isUserExists(accountId: string): Observable<boolean> {
    return from([true]);
  }

  getUserId(accountId: string): Observable<string> {
    return from(["userId"]);
  }

  findUserId(accountId: string): Observable<string | null> {
    return from([null]);
  }
}
