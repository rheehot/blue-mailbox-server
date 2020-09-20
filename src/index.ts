import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { MainResolver } from "./resolvers/resolver";
import { getConnection } from "typeorm";
import { config } from "./db/config";
     

async function main() {

  const _config:any = config // 디비 정보 불러오기
  await createConnection(_config);  // 디비 연결

  getConnection();

  try{
    const schema = await buildSchema({ // 스키마 빌드
      resolvers: [MainResolver], 
    });
    const server = new ApolloServer({ schema }); // 아폴로 서버
    await server.listen(4000); // 서버 주소
    console.log("✅ Server has started!");
  }catch(err){
    console.log(err)
  }

}

main();
