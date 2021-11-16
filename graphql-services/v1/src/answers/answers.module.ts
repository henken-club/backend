import { Module } from "@nestjs/common";

import { AnswersService } from "./answers.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";
import { TimestampModule } from "~/timestamp/timestamp.module";

@Module({
  imports: [
    GrpcClientsModule,
    TimestampModule,
  ],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
