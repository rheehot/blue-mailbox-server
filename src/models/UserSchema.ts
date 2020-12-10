import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// 스키마 파일 
// 디비에 있는 테이블과 컬럼들

@Entity()
@ObjectType() // 읽는타입
export class User extends BaseEntity {

    @PrimaryGeneratedColumn() 
    @Field()
    user_idx: number;

    @Column()
    @Field()
    kakao_id: string;

    @Column()
    @Field()
    user_name: string;

    @Column()
    @Field()
    user_email: string;

    @Column()
    @Field()
    access_token: string;

}

@InputType() // create, update, delete 하는 타입
export class InputUser{
    @Field()
    user_idx: number;

    @Field()
    kakao_id: string;

    @Field()
    access_token: string;
}