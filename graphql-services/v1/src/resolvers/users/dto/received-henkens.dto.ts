import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";

import { HenkenOrder } from "~/entities/henken.entities";
import { PaginationArgs } from "~/entities/pagination.entities";

@InputType("UserReceivedHenkensFilter")
export class UserReceivedHenkensFilter {
  @Field(() => ID)
  from!: string;
}

@ArgsType()
export class ReceivedHenkensArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  first!: number | null;

  @Field(() => String, { nullable: true })
  after!: string | null;

  @Field(() => Int, { nullable: true })
  last!: number | null;

  @Field(() => String, { nullable: true })
  before!: string | null;

  @Field(() => HenkenOrder)
  orderBy!: HenkenOrder;

  @Field(() => UserReceivedHenkensFilter, { nullable: true })
  filter!: UserReceivedHenkensFilter | null;
}