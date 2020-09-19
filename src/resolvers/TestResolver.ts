import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Test } from "../models/Test";

@Resolver()
export class TestResolver {
  @Query(() => String)
  books() {
    return "helloworld"
  }
}
