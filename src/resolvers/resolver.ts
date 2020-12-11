import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { User } from "../models/UserSchema";
import { getKakaoUserInfor, kakaoLogin, generateToken } from '../services/utils'
import { Context } from 'vm';
import { Card, HomeCardData } from "../models/CardSchema";
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

}
