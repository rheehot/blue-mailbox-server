import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { AuthChecker, buildSchema } from "type-graphql";
import { Context } from 'vm';
import { MainResolver } from "./resolvers/resolver";
import { getConnection } from "typeorm";
import { config } from "./db/config";
import { Token } from "./models/TokenSchema";
import { User } from "./models/UserSchema";


export const customAuthChecker:AuthChecker<Context> = async ({ context }) => {
  let headers = context.req.headers;
  let token = headers.token;

  const _token: any = await Token.findOne(
    {
      where: {
        token
      }
    }
  )

  if(!_token){
    return true;
  }

  console.log("token -> ",_token)

  // 유저 찾기
  const user = await User.findOne(
    {
      where: {
        user_idx: _token.user_idx
      }
    }
  )

  if(user){
    context.user = user;
  }

  console.log('dd', context.user)

  return true; // or false if access is denied
};


async function main() {

  const _config:any = config // 디비 정보 불러오기
  await createConnection(_config);  // 디비 연결

  getConnection();
  

  try{
    const schema = await buildSchema({ // 스키마 빌드
      resolvers: [MainResolver],
      authChecker: customAuthChecker 
    });
    const server = new ApolloServer({ schema,
      context: ({ req }) => {
        const context = {
          req,
        };
        return context;
      },
     }); // 아폴로 서버
    await server.listen(4000); // 서버 주소
    console.log("✅ Server has started!");
  }catch(err){
    console.log(err)
  }

}

main();
