import { Field, ObjectType } from "@nestjs/graphql";

import { Content } from "./content.entities";
import { User } from "./user.entities";

@ObjectType("SearchContentResult")
export class SearchContentResult {
  @Field((type) => Content)
  content!: Content;
}

@ObjectType("SearchUserResult")
export class SearchUserResult {
  @Field((type) => User)
  user!: { id: string };
}
