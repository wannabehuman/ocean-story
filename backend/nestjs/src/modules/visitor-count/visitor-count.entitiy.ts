import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class VisitorCount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  totalCount: number;
}