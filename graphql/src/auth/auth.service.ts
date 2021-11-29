import { Injectable } from "@nestjs/common";
import { from, Observable } from "rxjs";

import { AccountsService } from "~/account/accounts.service";

@Injectable()
export class AuthService {
  constructor(private readonly accounts: AccountsService) {
  }

  validate(
    authorization: string,
    { needRegister, roles: requiredRoles }: {
      needRegister: boolean;
      roles: string[];
    },
  ): Observable<
    | { status: true }
    | { status: false; message: string }
  > {
    return from(
      [{ status: true as const }],
    );
  }

  extractAccountId(authorization: string): Observable<string> {
    return from("accountId");
  }

  extractRoles(authorization: string): Observable<string[]> {
    return from([]);
  }
}
