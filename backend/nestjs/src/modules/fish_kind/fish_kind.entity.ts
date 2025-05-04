import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'fish_kind',
})
export class FishKind {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '어종 ID',
    })
    id: number;

    @Column({
        type: 'varchar',
        name: 'name',
        length: 100,
        comment: '어종 이름',
    })
    name: string;

    @Column({
        type: 'varchar',
        name: 'image_path',
        length: 255,
        nullable: true,
        comment: '이미지 저장 경로',
    })
    image_path: string;

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