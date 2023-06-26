import { forwardRef, Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [forwardRef(() => AlbumModule)],
  exports: [PhotoService],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
