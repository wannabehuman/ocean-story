import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

@Entity({
    name :'crews',
})
export class Crews{

    @PrimaryGeneratedColumn({
        type:'int',
        name:'crew_id',
        comment:'크루 아이디',
    })
    crew_id : number;

    @Column({
        type:'varchar',
        name:'crew_nm',
        nullable:false,
        comment:'크루 이름',
    })
    crew_nm: string;

    @Column({
        type:'varchar',
        name:'crew_role',
        comment:'크루 역할',
    })
    crew_role: string;

    @Column({
        type:'varchar',
        name:'crew_rank',
        comment:'크루 직급',
    })
    crew_rank: string;

    @Column({
        type:'varchar',
        name:'crew_type',
        comment:'크루 타입',
    })
    crew_type: string;

    @Column({
        type:'varchar',
        name:'crew_status',
        comment:'크루 상태',
    })
    crew_status: string;

    @Column({
        default:'',
        type:'varchar',
        name:'description',
        comment:'크루 소개',
    })
    description: string;

}
