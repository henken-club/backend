import {
  ArgsType,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { Henken } from "~/entities/henken.entities";

export enum CreateHenkenArgsContentType {
  TEMP_CONTENT,
  BOOK,
  BOOK_SERIES,
  AUTHOR,
}
registerEnumType(CreateHenkenArgsContentType, {
  name: "CreateHenkenArgsContentType",
});

@ArgsType()
export class CreateHenkenArgs {
  @Field(() => ID, { name: "toUserId" })
  toUserId!: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  comment!: string;

  @Field(() => ID)
  contentId!: string;

  @Field(() => CreateHenkenArgsContentType)
  contentType!: CreateHenkenArgsContentType;
}

@ObjectType()
export class CreateHenkenPayload {
  @Field(() => Henken)
  henken!: Henken;
}
