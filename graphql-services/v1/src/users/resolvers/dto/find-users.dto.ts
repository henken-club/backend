import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { User } from "~/users/user.entities";

@ArgsType()
export class FindUserArgs {
  @Field(() => ID, { nullable: true })
  id!: string | null;

  @Field(() => String, { nullable: true })
  alias!: string | null;
}

@ObjectType()
export class FindUserPayload {
  @Field(() => User, { nullable: true })
  user!: User | null;
}
