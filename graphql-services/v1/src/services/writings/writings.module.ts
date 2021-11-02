import { Module } from "@nestjs/common";

import { WritingsService } from "./writings.service";

@Module({
  imports: [],
  providers: [WritingsService],
  exports: [WritingsService],
})
export class WritingsModule {}
