import { Field, ObjectType } from "@nestjs/graphql";

import { ContentType, ContentUnion } from "./content.entities";
import { User } from "./user.entities";

@ObjectType("SearchContentResult")
export class SearchContentResult<
  TContentType extends ContentType = ContentType,
> {
  @Field((type) => ContentUnion)
  content!: { id: string; type: TContentType };
}

@ObjectType("SearchUserResult")
export class SearchUserResult {
  @Field((type) => User)
  user!: { id: string };
}
