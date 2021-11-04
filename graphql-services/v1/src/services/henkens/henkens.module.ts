import { Module } from "@nestjs/common";

import { TimestampModule } from "../timestamp/timestamp.module";

import { HenkensService } from "./henkens.service";

@Module({
  imports: [TimestampModule],
  providers: [HenkensService],
  exports: [HenkensService],
})
export class HenkensModule {}
