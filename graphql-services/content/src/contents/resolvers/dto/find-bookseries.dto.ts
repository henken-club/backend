import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { BookSeriesEntity } from "~/contents/entities/bookseries.entities";

@ArgsType()
export class FindBookSeriesArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindBookSeriesPayload {
  @Field(() => BookSeriesEntity, { nullable: true })
  bookSeries!: BookSeriesEntity | null;
}
