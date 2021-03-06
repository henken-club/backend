import { Module } from "@nestjs/common";

import { ActivitiesService } from "./activities.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

@Module({
  imports: [GrpcClientsModule],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
