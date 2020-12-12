import { Token } from "../models/TokenSchema";
import { User } from "../models/UserSchema";
const { v4: uuidv4 } = require('uuid');
const unirest = require('unirest');

export function getKakaoUserInfor(access_token: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        unirest
          .post('https://kapi.kakao.com/v2/user/me')
          .headers({
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded ',
            Authorization: 'Bearer ' + access_token
          })
          .end((result: any) => {
            console.log(result.status, result.headers, result.body);
            if (result.status == 200) {
              resolve(result.body);
            } else {
              console.log('12221error = ' + result.body);
              reject(result.body);
            }
          });
    });
  }

  export async function kakaoLogin(kakao_id: string, kakao_access_token: string, kakao_info: any){
    let user_data = {
        kakao_id,
        access_token: kakao_access_token,
        user_name: kakao_info.nickname
    };
  
    const user = await User.findOne(
      {
        where: {
          kakao_id
        }
      }
    )
    
    // 유저가 없을 시 생성해주자
    if(!user) {
      let newUser = await User.insert(user_data);
      const data = newUser.identifiers[0]
      return data;
    } else {
      // 기존유저는 토큰 값을 업뎃시켜줌
      const find: any = await User.findOne(
        { kakao_id: kakao_id }
      )

      const result = await user.save({
        ...find, // existing fields
        kakao_access_token // updated fields
      });

      console.log(result)
      // await User.update(kakao_access_token, );
    }

    return user;
  }

  export async function generateToken(token_data: any) {
    const token = uuidv4().replace(/-/g, '');

    const data = {
      user_idx: token_data.user_idx,
      token
    }
    await Token.insert(data)
    return token;
  }