import * as path from "path";

import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        // eslint-disable-next-line no-process-env
        url: process.env.CONNECTION_URL,
        package: "henkenclub.core",
        protoPath: [
          path.join(__dirname, "protobufs/common/pagination.proto"),
          path.join(__dirname, "protobufs/content/type.proto"),
          path.join(__dirname, "protobufs/core/answer.proto"),
          path.join(__dirname, "protobufs/core/following.proto"),
          path.join(__dirname, "protobufs/core/henken.proto"),
          path.join(__dirname, "protobufs/core/user.proto"),
        ],
      },
    },
  );
  await app.listen();
}
bootstrap();
