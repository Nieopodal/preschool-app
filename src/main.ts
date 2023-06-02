import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as hbs from 'express-handlebars';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { handlebarsHelpers } from './utils/handlebars-helpers';

async function bootstrap() {
  const { isEqual } = handlebarsHelpers;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.use(cookieParser());
  app.use(methodOverride('_method'));
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      defaultLayout: 'index',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
      helpers: { isEqual },
    }),
  );
  app.setViewEngine('hbs');
  await app.listen(3000);
}

bootstrap();
