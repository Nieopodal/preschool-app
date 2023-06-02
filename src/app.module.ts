import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfiguration } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { PhotoModule } from './photo/photo.module';
import { AdminModule } from './admin/admin.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    HomeModule,
    NewsModule,
    PhotoModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
