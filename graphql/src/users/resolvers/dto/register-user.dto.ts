import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

import { User } from "~/users/users.entities";

@ArgsType()
export class RegisterUserArgs {
  @Field(() => String)
  alias!: string;

  @Field(() => String)
  displayName!: string;

  @Field(() => String)
  avatar!: string;
}

@ObjectType()
export class RegisterUserPayload {
  @Field(() => User)
  user!: User;
}
