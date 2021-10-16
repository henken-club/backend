import { Module } from "@nestjs/common";

import { ContentModule } from "./account/content.module";

@Module({
  imports: [ContentModule],
})
export class AppModule {}
