import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm";

@Entity()
@ObjectType() // 읽는타입
export class Request extends BaseEntity {

    @PrimaryGeneratedColumn() 
    @Field()
    request_idx: number;

    @Column()
    @Field()
    contents: string;

}


@InputType() // create, update, delete 하는 타입
export class InputRequest{
    @Field({ nullable: true })
    request_idx: number;

    @Field({ nullable: true })
    contents: string;
}
