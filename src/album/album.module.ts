import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PhotoModule } from '../photo/photo.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [forwardRef(() => PhotoModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
