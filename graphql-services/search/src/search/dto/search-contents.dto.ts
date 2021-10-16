import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { SearchResultEntity } from "../search.entities";

export enum SearchContentsFilterType {
  AUTHOR,
  BOOK,
  BOOK_SERIES,
}
registerEnumType(SearchContentsFilterType, {
  name: "SearchContentsFilterType",
});

@InputType("SearchContentsFilter")
export class SearchContentsFilter {
  @Field((type) => SearchContentsFilterType, {
    defaultValue: null,
    nullable: true,
  })
  type!: SearchContentsFilterType;
}

@ArgsType()
export class SearchContentsArgs {
  @Field(() => String)
  query!: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => SearchContentsFilter)
  filter!: SearchContentsFilter;
}

@ObjectType()
export class SearchContentsPayload {
  @Field(() => [SearchResultEntity])
  results!: SearchResultEntity[];
}
