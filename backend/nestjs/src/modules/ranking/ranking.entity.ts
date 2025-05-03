import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({
    name: 'ranking',
})
export class Ranking {

    @PrimaryColumn({
        type: 'varchar',
        name: 'user_nm',
        length: 50,
        comment: '사용자 이름',
    })
    user_nm: string;

    @Column({
        type: 'timestamp',
        name: 'start_dt',
        nullable: true,
        comment: '시작 일시',
    })
    start_dt: Date;

    @Column({
        type: 'timestamp',
        name: 'end_dt',
        nullable: true,
        comment: '종료 일시',
    })
    end_dt: Date;

    @Column({
        type: 'int',
        name: 'time_calc',
        nullable: true,
        comment: '소요 시간',
    })
    time_calc: number;

    @Column({
        type: 'varchar',
        name: 'complete_flg',
        length: 1,
        default: 'N',
        comment: '완료 플래그',
    })
    complete_flg: string;
} 