import { ArgsType, Field, ID, InputType, Int } from "@nestjs/graphql";

import { HenkenOrder } from "~/entities/henken.entities";
import { PaginationArgs } from "~/entities/pagination/pagination.types";

@InputType("UserPostsHenkensFilter")
export class UserPostsHenkensFilter {
  @Field(() => ID)
  to!: string;
}

@ArgsType()
export class PostsHenkensArgs extends PaginationArgs {
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

  @Field(() => UserPostsHenkensFilter, { nullable: true })
  filter!: UserPostsHenkensFilter | null;
}
