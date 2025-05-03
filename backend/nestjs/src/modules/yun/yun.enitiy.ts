import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('yun') // 엔티티 이름 'yun'으로 설정
export class YunEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'yun_id',
    comment: '미친토끼 id',
  })
  yun_id: number;

  @Column({
    type: 'varchar',
    name: 'yun_name',
    comment: '미친토끼 이름',
  })
  yun_name: string;

  @Column({
    type: 'varchar',
    name: 'yun_brth',
    comment: '미친토끼 생년월일',
  })
  yun_brth: string;

  @Column({
    type: 'varchar',
    name: 'yun_gndr',
    comment: '미친토끼 성별',
  })
  yun_gndr: string;

  @Column({
    type: 'varchar',
    name: 'yun_nknm',
    comment: '미친토끼 별명',
  })
  yun_nknm: string;
}
