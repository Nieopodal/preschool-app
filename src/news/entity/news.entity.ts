import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generateSlugHandler } from '../../utils/generate-slug.handler';

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn()
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

  @BeforeInsert()
  @BeforeUpdate()
  generateSlugId() {
    this.id = generateSlugHandler(this.title);
  }
}
