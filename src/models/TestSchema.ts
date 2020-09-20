import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// 스키마 파일 
// 디비에 있는 테이블과 컬럼들

@Entity()
@ObjectType() // 읽는타입
export class Test extends BaseEntity {

    @PrimaryGeneratedColumn() 
    @Field()
    test_idx: number;

    @Column()
    @Field()
    test_name: string;

}


@InputType() // create, update, delete 하는 타입
export class InputTest{
    @Field()
    test_idx: number;

    @Field()
    test_name: string;
}