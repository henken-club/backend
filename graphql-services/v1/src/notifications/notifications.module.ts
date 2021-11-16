import { Module } from "@nestjs/common";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

import { NotificationsService } from "./notifications.service";

@Module({
  imports: [GrpcClientsModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
