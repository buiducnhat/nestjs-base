import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import setupSwagger from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix(configService.get<string>('apiPrefix'));

  setupSwagger(app);

  const port = configService.get<number>('port');
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
  });
}
bootstrap();
