import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfiguration } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { PhotoModule } from './photo/photo.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AlbumModule } from './album/album.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
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
    AlbumModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
