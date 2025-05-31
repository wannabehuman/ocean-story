import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

@Entity({
    name :'season_fish',
})
export class SeasonFish{
    @PrimaryGeneratedColumn({
        type:'int',
    })
    id : number;
    
    @Column({
        type:'varchar',
        name:'FishName',
        nullable:false,
        comment:'어종',
    })
    name: string;

    @Column({
        type:'varchar',
        name:'Description',
        nullable:true,
        comment:'설명',
    })
    description: string;

    @Column({
        type:'varchar',
        name:'Dir',
        nullable:true,
        comment:'경로',
    }) 
    imagedir: string;
}
