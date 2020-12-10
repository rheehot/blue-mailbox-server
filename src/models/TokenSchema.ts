import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// 스키마 파일 
// 디비에 있는 테이블과 컬럼들

@Entity()
@ObjectType() // 읽는타입
export class Token extends BaseEntity {

    @PrimaryGeneratedColumn() 
    @Field()
    token_idx: number;

    @Column()
    @Field()
    user_idx: number;

    @Column()
    @Field()
    token: string;

}