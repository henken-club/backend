import { ArgsType, Field, Int, ObjectType } from "@nestjs/graphql";

import { SearchUserResult } from "~/entities/search.entities";

@ArgsType()
export class SearchUserArgs {
  @Field(() => String)
  query!: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip!: number;

  @Field(() => Int)
  limit!: number;
}

@ObjectType("SearchUserPayload")
export class SearchUserPayload {
  @Field(() => [SearchUserResult])
  results!: SearchUserResult[];
}
