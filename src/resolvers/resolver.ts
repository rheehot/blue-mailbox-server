import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { InputTest, Test } from "../models/TestSchema";

// resolver는 직접적으로 스키마 파일을 불러와 데이터를 조작하는 파일입니다.
// find() 이런 문법을 통해서 스키마 디비를 조회, 생성합니다.

@Resolver()
export class MainResolver {
  @Query(() => String)
  books() {
    return "helloworld"
  }

  @Query(() => [Test]) // 리턴타입
  find_test(
    @Arg("table_idx", { nullable: true }) table_idx?: number, // args
  ) { 
    return Test.find({
      where: {
        table_idx: table_idx
      }
    })
  }

}
