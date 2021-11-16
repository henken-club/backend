import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

import { ActivitiesService } from "./activities.service";

@Module({
  imports: [GrpcClientsModule],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
