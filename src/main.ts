import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as hbs from 'express-handlebars';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { handlebarsHelpers } from './utils/handlebars-helpers';
import { urlencoded } from 'express';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const { isEqual } = handlebarsHelpers;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.use(express.json());
  app.use(methodOverride('_method'));
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,

      whitelist: true,
      forbidNonWhitelisted: true,

      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
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
