import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from '../../photo/entity/photo.entity';
import { generateSlugHandler } from '../../utils/generate-slug.handler';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40,
  })
  title: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    default: 0,
  })
  numberOfPhotos: number;

  @OneToMany(() => Photo, (entity) => entity.album)
  photos: Photo[];

  @Column({
    unique: true,
    length: 255,
  })
  slug: string;

  @BeforeInsert()
  generateSlugId() {
    this.slug = generateSlugHandler(this.title);
  }
}
