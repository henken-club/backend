import { Controller } from "@nestjs/common";

import { UpserterService } from "./upserter.service";

import {
  HENKENCLUB_SEARCH_V1_PACKAGE_NAME,
  UpsertAuthorRequest,
  UpsertBookRequest,
  UpsertBookSeriesRequest,
  UpserterController as UpserterControllerInterface,
  UpserterControllerMethods,
  UpsertResponse,
} from "~/protogen/upserter";

@UpserterControllerMethods()
@Controller(HENKENCLUB_SEARCH_V1_PACKAGE_NAME)
export class UpserterController implements UpserterControllerInterface {
  constructor(private readonly upserter: UpserterService) {}

  async upsertAuthor(request: UpsertAuthorRequest): Promise<UpsertResponse> {
    return this.upserter
      .upsertAuthor(request)
      .then((result) => ({ success: result }))
      .catch(() => ({ success: false }));
  }

  async upsertBook(request: UpsertBookRequest): Promise<UpsertResponse> {
    return this.upserter
      .upsertBook(request)
      .then((result) => ({ success: result }))
      .catch(() => ({ success: false }));
  }

  async upsertBookSeries(
    request: UpsertBookSeriesRequest,
  ): Promise<UpsertResponse> {
    return this.upserter
      .upsertBookSeries(request)
      .then((result) => ({ success: result }))
      .catch(() => ({ success: false }));
  }
}
