import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({
    name: 'fish_mission',
})
export class FishMission {

    @PrimaryColumn({
        type: 'varchar',
        name: 'user_nm',
        length: 50,
        comment: '사용자 이름',
    })
    user_nm: string;

    @Column({
        type: 'varchar',
        name: 'fish_type1',
        length: 50,
        nullable: true,

    })
    fish_type1: string;

    @Column({
        type: 'varchar',
        name: 'fish_type2',
        length: 50,
        nullable: true,
    
    })
    fish_type2: string;

    @Column({
        type: 'varchar',
        name: 'fish_type3',
        length: 50,
        nullable: true,

    })
    fish_type3: string;

    @Column({
        type: 'varchar',
        name: 'fish_type4',
        length: 50,
        nullable: true,
    })
    fish_type4: string;

    @Column({
        type: 'varchar',
        name: 'fish_type5',
        length: 50,
        nullable: true,
    })
    fish_type5: string;

    @Column({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
        comment: '생성 일시',
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;
} 