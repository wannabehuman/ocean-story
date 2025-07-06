import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fishinform')
export class FishMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  FishName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Region: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  StartDate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  EndDate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ProtectStartDate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ProtectEndDate: string;

  @Column({ type: 'int', nullable: true })
  ProtectLength: number;

  @Column({ type: 'int', nullable: true })
  ActiveTemp_L: number;

  @Column({ type: 'int', nullable: true })
  ActiveTemp_H: number;
} 