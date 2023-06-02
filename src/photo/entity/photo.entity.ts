import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40,
  })
  title: string;

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
}
