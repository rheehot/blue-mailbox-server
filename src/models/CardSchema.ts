import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// 스키마 파일 
// 디비에 있는 테이블과 컬럼들

@Entity()
@ObjectType() // 읽는타입
export class Card extends BaseEntity {

    @PrimaryGeneratedColumn() 
    @Field()
    card_idx: number;

    @Column()
    @Field()
    card_img_url: string;

    @Column()
    @Field()
    card_keyword: string;

    @Column()
    @Field()
    card_title: string;

    @Column()
    @Field()
    card_describe: string;

}


@InputType() // create, update, delete 하는 타입
export class InputCard{
    @Field()
    card_idx: number;

    @Field()
    card_img_url: string;

    @Field()
    card_keyword: string;

    @Field()
    card_title: string;

    @Field()
    card_describe: string;
}