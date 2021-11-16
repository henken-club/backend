import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { SearchContentResult } from "../search.entities";

export enum SearchContentFilterType {
  AUTHOR,
  BOOK,
  BOOK_SERIES,
}
registerEnumType(SearchContentFilterType, {
  name: "SearchContentFilterType",
});

@InputType("SearchContentFilter")
export class SearchContentFilter {
  @Field((type) => SearchContentFilterType, {
    defaultValue: null,
    nullable: true,
  })
  type!: SearchContentFilterType;
}

@ArgsType()
export class SearchContentArgs {
  @Field(() => String)
  query!: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => SearchContentFilter)
  filter!: SearchContentFilter;
}

@ObjectType("SearchContentPayload")
export class SearchContentPayload {
  @Field(() => [SearchContentResult])
  results!: SearchContentResult[];
}
