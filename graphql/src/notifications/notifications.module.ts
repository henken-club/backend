import { Module } from "@nestjs/common";

import { NotificationsService } from "./notifications.service";

import { GrpcClientsModule } from "~/grpc-clients/grpc-clients.module";

@Module({
  imports: [GrpcClientsModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
