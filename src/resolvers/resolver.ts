import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { User } from "../models/UserSchema";
import { getKakaoUserInfor, kakaoLogin, generateToken } from '../services/utils'
import { Context } from 'vm';
import { Card, HomeCardData, InputCard } from "../models/CardSchema";
import { Like } from "typeorm";
import { InputWriteCard, MailboxReturn, WriteCard } from "../models/WriteCardSchema";
import { getManager } from 'typeorm';

// resolver는 직접적으로 스키마 파일을 불러와 데이터를 조작하는 파일입니다.
// find() 이런 문법을 통해서 스키마 디비를 조회, 생성합니다.

@Resolver()
export class MainResolver {
  @Query(() => String)
  books() {
    return "helloworld"
  }

  @Mutation(() => Boolean) // 리턴타입
  async test(
    @Arg("kakao_id", { nullable: true }) kakao_id?: string,
    @Arg("access_token", { nullable: true }) access_token?: string,
  ) { 
    const data = {
      kakao_id,
      access_token
    }
    
    try{
      const result = await User.insert(data);
    }catch(err){
      console.log(err)
    }
    return true;
  }

  @Mutation(() => String, { nullable: true })
  async login_social(
    @Arg('social_id', { nullable: false }) social_id: string,
    @Arg('social_access_token', { nullable: false }) social_access_token: string,
    @Ctx() ctx: Context
  ) {
    try {
      // console.log(ctx)
      const result = await getKakaoUserInfor(social_access_token);
      if(!result){
        throw "로그인 불가?"
      }
      const user:any = await kakaoLogin(social_id, social_access_token, result.properties)

      const token_data = {
        user_idx: user.user_idx
      }
      const token = await generateToken(token_data);
      console.log(token)
      return token;
    } catch (e) {
      console.error('login social error', e);
    }
  }

  @Authorized()
  @Query(() => User)
  async my_info(
    @Ctx() ctx: Context
  ){
    const user_idx = ctx.user.user_idx;

    return await User.findOne(
      {
        where: {
          user_idx: user_idx
        }
      }
    )
  }

  @Query(() => HomeCardData)
  async select_main(
  ){
    try{
      const main_img = await Card.findOne(
        {
          where: {
            card_main: true
          }
        }
      )
  
      const card_list_pop = await Card.find(
        {
          where: {
            card_main: false,
          },
          skip: 0,
          take: 4,
          order: {
            card_idx: 'ASC'
          }
        }
      )

      const card_list_christmas = await Card.find(
        {
          where: {
            card_main: false,
          },
          skip: 0,
          take: 4,
          order: {
            card_idx: 'DESC'
          }
        }
      )
  
      return {
        main_img,
        card_list_pop,
        card_list_christmas
      }
    }catch(err){
      console.log(err)
    }

  }

  @Query(() => Card)
  async card_view_info(
    @Arg('card_idx', { nullable: false }) card_idx: number,
  ){
    console.log(card_idx)
    try{
      return await Card.findOne(
        {
          where: {
            card_idx: card_idx
          }
        }
      )
    }catch(err){
      console.log(err)
    }
  }

  @Query(() => [Card])
  async card_search(
    @Arg('card_keyword', { nullable: false }) card_keyword: string,
  ){
    try{
      return await Card.find(
        {
          where: {
            card_keyword: Like(`%${card_keyword}%`)
          }
        }
      )
    }catch(err){
      console.log(err)
    }
  }

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async write_to_card(
    @Arg('data', { nullable: false }) data: InputWriteCard,
    @Ctx() ctx: Context
  ) {
    try {
      const user_idx = ctx.user.user_idx;

      if(!user_idx){
        throw "회원가입을 해주세요!"
      }

      const card_send_code = Math.random().toString(36).slice(2); 

      // data.card_idx = ca;
      data.card_idx = Number(data.card_idx);
      data.user_idx = Number(user_idx);
      data.card_send_code = card_send_code;

      console.log("data ==> ", data)

      await WriteCard.insert(data);

      return card_send_code;

    } catch (e) {
       throw "문제가 발생하였습니다."
    }
  }


  @Query(() => MailboxReturn)
  async select_write_card(
    @Arg('card_send_code', { nullable: false }) card_send_code: string,
  ){
    try{
      const entityManager = getManager();
      const someQuery = await entityManager.query(`
        select u.user_name, c.card_img_url, card_title, wc.card_contents, wc.card_font from blue_mailbox.write_card wc
        left join card c
        on wc.card_idx = c.card_idx 
        left join user u
        on wc.user_idx = u.user_idx
        where wc.card_send_code = '${card_send_code}'; 
      `)

      return someQuery[0];
    }catch(err){
      console.log(err)
    }
  }

}
