import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  /**
   * 0: 슈퍼관리자
   * 1: 관리자
   * 2: 일반 사용자
   */
  @Column({ default: 2 })
  role: number;  // 회원가입 시 기본값 2  원기형 db직접 건드려서 0으로 바꿔줘요 ㅋ 가입할때 조정할수있게하려면 좀 복잡해서 기본은 사용자로 해놨습니다다
}
