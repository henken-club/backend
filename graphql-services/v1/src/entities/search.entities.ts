import { Field, ObjectType } from "@nestjs/graphql";

import { ContentType, ContentUnion } from "./content.entities";

@ObjectType("SearchContentResult")
export class SearchContentResult<
  TContentType extends ContentType = ContentType,
> {
  @Field((type) => ContentUnion)
  content!: { id: string; type: TContentType };
}

@ObjectType("SearchUserResult")
export class SearchUserResult {
  userId!: string;
}
