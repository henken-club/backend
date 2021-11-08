import { Metadata } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { Observable } from "rxjs";

import {
  CreateHenkenRequest,
  CreateHenkenResponse,
  FindHenkenRequest,
  FindHenkenResponse,
  GetHenkenRequest,
  GetHenkenResponse,
  HenkenController as IHenkenController,
  HenkenControllerMethods,
  ManyHenkensRequest,
  ManyHenkensResponse,
} from "~/protogen/core/henken";
import { HENKENCLUB_CORE_PACKAGE_NAME } from "~/protogen/core/user";

@HenkenControllerMethods()
@Controller(HENKENCLUB_CORE_PACKAGE_NAME)
export class HenkenController implements IHenkenController {
  constructor() {}

  getHenken(
    request: GetHenkenRequest,
    metadata?: Metadata,
  ): Observable<GetHenkenResponse> {
    throw new Error("Method not implemented.");
  }

  findHenken(
    request: FindHenkenRequest,
    metadata?: Metadata,
  ): Observable<FindHenkenResponse> {
    throw new Error("Method not implemented.");
  }

  manyHenkens(
    request: ManyHenkensRequest,
    metadata?: Metadata,
  ): Observable<ManyHenkensResponse> {
    throw new Error("Method not implemented.");
  }

  createHenken(
    request: CreateHenkenRequest,
    metadata?: Metadata,
  ): Observable<CreateHenkenResponse> {
    throw new Error("Method not implemented.");
  }
}
