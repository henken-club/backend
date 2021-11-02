import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { Book } from "~/entities/books.entities";

@ArgsType()
export class FindBookArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindBookPayload {
  @Field(() => Book, { nullable: true })
  book!: Book | null;
}
