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
              console.log('success = ' + result.body);
              resolve(result.body);
            } else {
              console.log('12221error = ' + result.body);
              reject(result.body);
            }
          });
    });
  }

  export function kakaoLogin(kakao_id: string, kakao_access_token: string){
    let user_data = {
        kakao_id,
        kakao_access_token,
      };
  

    // let newUser = await UserSchema.create(user_data);
    // return newUser; 
  }