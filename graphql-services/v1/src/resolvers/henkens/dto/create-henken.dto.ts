import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { Henken } from "~/entities/henken.entities";

@ArgsType()
export class CreateHenkenArgs {
  @Field(() => ID)
  to!: string;

  @Field(() => ID)
  content!: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  comment!: string;
}

@ObjectType()
export class CreateHenkenPayload {
  @Field(() => Henken)
  henken!: Henken;
}
