import { Injectable } from "@nestjs/common";
import { from, Observable } from "rxjs";

@Injectable()
export class AccountsService {
  constructor() {}

  isUserExists(accountId: string): Observable<boolean> {
    return from([false]);
  }

  getUserId(accountId: string): Observable<string | null> {
    return from([null]);
  }
}
