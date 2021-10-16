import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { BookEntity } from "~/contents/entities/books.entities";

@ArgsType()
export class FindBookArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindBookPayload {
  @Field(() => BookEntity, { nullable: true })
  book!: BookEntity | null;
}
