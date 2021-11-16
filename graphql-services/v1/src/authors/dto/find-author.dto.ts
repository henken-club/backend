import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { Author } from "../author.entities";

@ArgsType()
export class FindAuthorArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindAuthorPayload {
  @Field(() => Author, { nullable: true })
  author!: Author | null;
}
