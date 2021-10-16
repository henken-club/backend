import { Controller, Get } from "@nestjs/common";
import {
  GRPCHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private grpc: GRPCHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
