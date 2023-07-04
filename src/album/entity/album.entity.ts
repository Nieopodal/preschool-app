import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Photo } from '../../photo/entity/photo.entity';
import { generateSlugHandler } from '../../utils/generate-slug.handler';
import * as short from 'short-uuid';

@Entity()
export class Album extends BaseEntity {
  @PrimaryColumn()
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
  generateSlug() {
    this.slug = generateSlugHandler(this.title);
  }

  @BeforeInsert()
  generateId() {
    this.id = short.generate();
  }
}
