import { Controller } from "@nestjs/common";

import {
  AccountController as AccountControllerInterface,
  AccountControllerMethods,
  ConnectRequest,
  ConnectResponse,
  HENKENCLUB_AUTH_PACKAGE_NAME,
} from "~/protogen/auth/account";

@AccountControllerMethods()
@Controller(HENKENCLUB_AUTH_PACKAGE_NAME)
export class AccountController implements AccountControllerInterface {
  constructor() {}

  async connect(request: ConnectRequest): Promise<ConnectResponse> {
    return { success: true };
  }
}
