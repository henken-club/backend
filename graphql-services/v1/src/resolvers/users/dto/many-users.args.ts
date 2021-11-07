import { ArgsType, Field, Int } from "@nestjs/graphql";

import { PaginationArgs } from "~/entities/pagination.entities";
import { UserOrder } from "~/entities/user.entities";

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
