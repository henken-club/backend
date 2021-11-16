import { ArgsType, Field, Int } from "@nestjs/graphql";

import { PaginationArgs } from "~/pagination/pagination.entities";
import { UserOrder } from "~/users/user.entities";

@ArgsType()
export class ManyUsersArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  first!: number | null;

  @Field(() => String, { nullable: true })
  after!: string | null;

  @Field(() => Int, { nullable: true })
  last!: number | null;

  @Field(() => String, { nullable: true })
  before!: string | null;

  @Field(() => UserOrder)
  orderBy!: UserOrder;
}
