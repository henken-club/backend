import { ArgsType, Field, ID, ObjectType } from "@nestjs/graphql";

import { BookSeries } from "~/entities/content/bookseries.entities";

@ArgsType()
export class FindBookSeriesArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindBookSeriesPayload {
  @Field(() => BookSeries, { nullable: true })
  bookSeries!: BookSeries | null;
}
