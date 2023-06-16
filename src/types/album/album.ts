import { Album } from '../../album/entity/album.entity';
import { Photo } from '../../photo/entity/photo.entity';

export interface AlbumWithPhotos extends Album {
  photos: Photo[];
}
