import { ArgsType, Field, Int } from "@nestjs/graphql";

import { BookSeriesOrder } from "~/entities/content/bookseries.entities";
import { PaginationArgs } from "~/entities/pagination/pagination.types";

@ArgsType()
export class ManyBookSeriesArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  first!: number | null;

  @Field(() => String, { nullable: true })
  after!: string | null;

  @Field(() => Int, { nullable: true })
  last!: number | null;

  @Field(() => String, { nullable: true })
  before!: string | null;

  @Field(() => BookSeriesOrder)
  orderBy!: BookSeriesOrder;
}
