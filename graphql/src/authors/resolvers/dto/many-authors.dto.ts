import { ArgsType, Field, Int } from "@nestjs/graphql";

import { AuthorOrder } from "../../authors.entities";

import { PaginationArgs } from "~/pagination/pagination.entities";

@ArgsType()
export class ManyAuthorsArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  first!: number | null;

  @Field(() => String, { nullable: true })
  after!: string | null;

  @Field(() => Int, { nullable: true })
  last!: number | null;

  @Field(() => String, { nullable: true })
  before!: string | null;

  @Field(() => AuthorOrder)
  orderBy!: AuthorOrder;
}
