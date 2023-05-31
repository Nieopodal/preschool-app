import { NestFactory } from '@nestjs/core';
import * as hbs from 'express-handlebars';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.use(cookieParser());
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
