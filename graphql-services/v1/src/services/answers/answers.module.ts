import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "../grpc-clients/grpc-clients.module";
import { TimestampModule } from "../timestamp/timestamp.module";

import { AnswersService } from "./answers.service";

@Module({
  imports: [
    GrpcClientsModule,
    TimestampModule,
  ],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
