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
import * as dotenv from "dotenv";
dotenv.config();
const cors = require('cors');

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
  console.log("1")
  const _config:any = config // 디비 정보 불러오기
  console.log(_config)
  await createConnection(_config);  // 디비 연결

  console.log("2")
  getConnection();
  
  console.log("3")

  try{

  console.log("4")
    const schema = await buildSchema({ // 스키마 빌드
      resolvers: [MainResolver],
      authChecker: customAuthChecker 
    });

  console.log("5")
    const server = new ApolloServer({ schema,
      context: ({ req }) => {
        const context = {
          req,
        };
        return context;
      }, 
      introspection: true,
      playground: true
     }); // 아폴로 서버
    console.log(process.env.PORT)
    // server.listen(cors());
    await server.listen({ port: process.env.PORT || 4000 }).catch( // handler 추가
      function (error) {
      console.log('catch handler', error);
      });
    console.log("✅ Server has started!");
  }catch(err){
    console.log(err)
  }

}
// adasda
main();
