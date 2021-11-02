import { Module } from "@nestjs/common";

import { HenkensService } from "./henkens.service";

@Module({
  imports: [],
  providers: [HenkensService],
  exports: [HenkensService],
})
export class HenkensModule {}
