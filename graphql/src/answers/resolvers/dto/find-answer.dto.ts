import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { Answer } from "../../answers.entities";

@ArgsType()
export class FindAnswerArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindAnswerPayload {
  @Field(() => Answer, { nullable: true })
  answer!: Answer | null;
}
