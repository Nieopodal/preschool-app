import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
}
