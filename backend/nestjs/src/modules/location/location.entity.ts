import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'location',
})
export class Location {

    @PrimaryColumn({
        type: 'varchar',
        name: 'code',
        length: 100,
        comment: '위치 코드',
    })
    code: string;

    @Column({
        type: 'varchar',
        name: 'name',
        length: 255,
        comment: '위치 이름',
    })
    name: string;
    @Column({
        type: 'decimal',
        name: 'latitude',
        precision: 10,
        scale: 7,
        comment: '위도',
    })
    latitude: number;
    @Column({
        type: 'decimal',
        name: 'longitude',
        precision: 10,
        scale: 7,
        comment: '경도',
    })
    longitude: number;
    
    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
        comment: '생성 일시',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
        comment: '수정 일시',
    })
    updated_at: Date;
}
