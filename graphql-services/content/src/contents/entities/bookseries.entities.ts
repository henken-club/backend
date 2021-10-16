import {
  Directive,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import {
  Connection,
  Edge,
  Node,
  OrderDirection,
  PageInfoEntity,
} from "~/pagination/pagination.types";

@ObjectType("BookSeries", { implements: () => [Node] })
@Directive("@key(fields: \"id\")")
export class BookSeriesEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  title!: string;
}

@ObjectType("BookSeriesEdge", { implements: () => [Edge] })
export class BookSeriesEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("BookSeriesConnection", { implements: () => [Connection] })
export class BookSeriesConnectionEntity implements Connection {
  @Field((type) => [BookSeriesEdgeEntity])
  edges!: BookSeriesEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

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
