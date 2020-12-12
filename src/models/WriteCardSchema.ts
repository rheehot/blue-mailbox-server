import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

// 스키마 파일 
// 디비에 있는 테이블과 컬럼들

@Entity()
@ObjectType() // 읽는타입
export class WriteCard extends BaseEntity {

    @PrimaryGeneratedColumn() 
    @Field({ nullable: true })
    write_card_idx: number;

    // @Field({ nullable: true })
    // user_idx: string;

    @Column()
    @Field({ nullable: true })
    card_contents: string;

    @Column()
    @Field({ nullable: true })
    card_paper_color: string;

    @Column()
    @Field({ nullable: true })
    card_font: string;

    @Column()
    @Field({ nullable: true })
    card_send_code: string;

    @Column()
    @Field({ nullable: true })
    user_idx: number;

    @Column()
    @Field({ nullable: true })
    card_idx: number;

}


@InputType() // create, update, delete 하는 타입
export class InputWriteCard{
    @Field({ nullable: true })
    write_card_idx?: number;

    // @Field({ nullable: true })
    // user_idx: string;

    @Field({ nullable: true })
    card_contents: string;

    @Field({ nullable: true })
    card_paper_color?: string;

    @Field({ nullable: true })
    card_font: string;

    @Field({ nullable: true })
    card_send_code?: string;

    @Field({ nullable: true })
    user_idx?: number;

    @Field({ nullable: true })
    card_idx?: number;
}

@ObjectType() 
export class MailboxReturn{
    @Field({ nullable: true })
    user_name?: string;

    @Field({ nullable: true })
    card_img_url: string;

    @Field({ nullable: true })
    card_title: string;

    @Field({ nullable: true })
    card_contents?: string;

    @Field({ nullable: true })
    card_font?: string;
}
