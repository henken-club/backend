import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { Henken } from "../../henken.entities";

@ArgsType()
export class FindHenkenArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindHenkenPayload {
  @Field(() => Henken, { nullable: true })
  henken!: Henken | null;
}
