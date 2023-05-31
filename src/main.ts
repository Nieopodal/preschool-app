import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as hbs from 'express-handlebars';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      defaultLayout: 'index',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
    }),
  );
  app.setViewEngine('hbs');
  await app.listen(3000);
}

bootstrap();
