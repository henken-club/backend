import { Module } from "@nestjs/common";

import { TimestampService } from "./timestamp.service";

@Module({
  imports: [],
  providers: [TimestampService],
  exports: [TimestampService],
})
export class TimestampModule {}
