import { Controller } from "@nestjs/common";

import {
  ContentController as ContentControllerInterface,
  ContentControllerMethods,
  CreateTempContentRequest,
  CreateTempContentResponse,
  HENKENCLUB_TEMPCONTENT_V1_PACKAGE_NAME,
} from "~/protogen/content";

@ContentControllerMethods()
@Controller(HENKENCLUB_TEMPCONTENT_V1_PACKAGE_NAME)
export class ContentController implements ContentControllerInterface {
  constructor() {}

  async createTempContent(
    request: CreateTempContentRequest,
  ): Promise<CreateTempContentResponse> {
    return { contentId: "1" };
  }
}
