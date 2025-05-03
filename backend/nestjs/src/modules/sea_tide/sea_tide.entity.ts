import { Entity, PrimaryGeneratedColumn,Column,PrimaryColumn } from "typeorm";

@Entity({
    name :'sea_tide',
})
export class SeaTide{


    @PrimaryColumn({
        type: 'date',
        name: 'tide_date',
        comment: '조위 날짜'
    })
    tideDate: Date;

    @PrimaryColumn({
        type: 'varchar',
        length: 20,
        name: 'location',
        comment: '관측소 위치',
    })
    location: string;

    @Column({
        type:'varchar',
        name:'first_low_tide',
        comment:'첫번째 저조',
        nullable:true,
    })
    first_low_tide: string;
    @Column({
        type:'time',
        name:'first_low_tide_time',
        comment:'첫번째 저조 시간',
        nullable:true,
    })
    first_low_tide_time: string;


    @Column({
        type:'varchar',
        name:'second_low_tide',
        comment:'두번째 저조',
        nullable:true,
    })
    second_low_tide: string;
    @Column({
        type:'time',
        name:'second_low_tide_time',
        comment:'두번째 저조 시간',
        nullable:true,
    })
    second_low_tide_time: string;

    @Column({
        type:'varchar',
        name:'first_high_tide',
        comment:'첫번째 고조',
        nullable:true,
    })
    first_high_tide: string;
    @Column({
        type:'time',
        name:'first_high_tide_time',
        comment:'첫번째 고조 시간',
        nullable:true,
    })
    first_high_tide_time: string;

    @Column({
        type:'varchar',
        name:'second_high_tide',
        comment:'두번째 고조',
        nullable:true,
    })
    second_high_tide: string;
    @Column({
        type:'time',
        name:'second_high_tide_time',
        comment:'두번째 고조 시간',
        nullable:true,
    })
    second_high_tide_time: string;

}
