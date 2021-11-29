import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line no-process-env
  await app.listen(parseInt(process.env.PORT, 10) || 8000);
}
bootstrap();