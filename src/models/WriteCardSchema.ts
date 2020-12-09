import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// 스키마 파일 
// 디비에 있는 테이블과 컬럼들

@Entity()
@ObjectType() // 읽는타입
export class WriteCard extends BaseEntity {

    @PrimaryGeneratedColumn() 
    @Field()
    write_card_idx: number;

    @Field()
    user_idx: number;

    @Field()
    card_idx: number;

    @Column()
    @Field()
    card_contents: string;

    @Column()
    @Field()
    card_paper_color: string;

    @Column()
    @Field()
    card_font: string;

    @Column()
    @Field()
    card_send_code: string;

}


@InputType() // create, update, delete 하는 타입
export class InputWriteCard{
    @Field()
    write_card_idx: number;

    @Field()
    user_idx: number;

    @Field()
    card_idx: number;

    @Field()
    card_contents: string;

    @Field()
    card_paper_color: string;

    @Field()
    card_font: string;

    @Field()
    card_send_code: string;
}