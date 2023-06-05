import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../../album/entity/album.entity';

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 41,
  })
  fileName: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    length: 100,
  })
  path: string;

  @Column()
  size: number;

  @ManyToOne(() => Album, (entity) => entity.photos)
  album: Album;
}
