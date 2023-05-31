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
    nullable: false,
  })
  title: string;

  @Column({
    length: 5000,
    nullable: false,
  })
  article: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
}
