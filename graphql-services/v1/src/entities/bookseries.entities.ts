import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { ContentType } from "./content.entities";
import {
  Connection,
  Edge,
  Node,
  OrderDirection,
  PageInfo,
} from "./pagination.entities";

@ObjectType("BookSeries", { implements: () => [Node] })
export class BookSeries implements Node {
  type!: ContentType.BOOK_SERIES;

  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  title!: string;
}

@ObjectType("BookSeriesEdge", { implements: () => [Edge] })
export class BookSeriesEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("BookSeriesConnection", { implements: () => [Connection] })
export class BookSeriesConnection implements Connection {
  @Field((type) => [BookSeriesEdge])
  edges!: BookSeriesEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum BookSeriesOrderField {
  ID,
}
registerEnumType(BookSeriesOrderField, {
  name: "BookSeriesOrderField",
});

@InputType()
export class BookSeriesOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => BookSeriesOrderField)
  field!: BookSeriesOrderField;
}
