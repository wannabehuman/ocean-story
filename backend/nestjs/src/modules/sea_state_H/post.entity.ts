import { Entity, PrimaryGeneratedColumn,Column } from "typeorm";

@Entity({
    name :'post',
})
export class Post{
    @PrimaryGeneratedColumn({
        type:'int',
    })
    id : number;

    @Column({
        type:'varchar',
        length:255,
        nullable:false,
    })
    title: string;

    @Column({
        type:'text',
        nullable:false,

    })
    content: string;

    @Column({
        type : 'int',
        name: 'author_id',
        nullable:false,
    })
    authorId : number;
}
