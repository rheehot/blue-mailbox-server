import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../models/UserSchema";
import { getKakaoUserInfor, kakaoLogin, generateToken } from '../services/utils'

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
  ) {
    try {
      const result = await getKakaoUserInfor(social_access_token);
      if(!result){
        throw "로그인 불가?"
      }
      const user:any = kakaoLogin(social_id, social_access_token, result.properties)

      const token = await generateToken();
      console.log(token)
      return token;
    } catch (e) {
      console.error('login social error', e);
    }
  }

}
