import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { Answer, AnswerType } from "~/answers/answers.entities";

@ArgsType()
export class AnswerHenkenArgs {
  @Field(() => ID, { name: "henkenId" })
  henkenId!: string;

  @Field(() => String)
  comment!: string;

  @Field(() => AnswerType, { name: "type" })
  answerType!: AnswerType;
}

@ObjectType()
export class AnswerHenkenPayload {
  @Field(() => Answer)
  answer!: Answer;
}
