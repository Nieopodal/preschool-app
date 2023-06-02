import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { NewsModule } from '../news/news.module';

@Module({
  imports: [NewsModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
