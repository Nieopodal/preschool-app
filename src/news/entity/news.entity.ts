import * as short from 'short-uuid';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { generateSlugHandler } from '../../utils/generate-slug.handler';

@Entity()
export class News extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 60,
  })
  title: string;

  @Column({
    length: 5000,
  })
  article: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @Column()
  isTooLong: boolean;

  @Column({
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
