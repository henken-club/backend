import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { ContentType } from "~/content/content.entities";
import {
  Connection,
  Edge,
  Node,
  OrderDirection,
  PageInfo,
} from "~/pagination/pagination.entities";

@ObjectType("Book", { implements: () => [Node] })
export class Book implements Node {
  type!: ContentType.BOOK;

  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  title!: string;

  @Field((type) => String, { nullable: true })
  isbn!: string | null;
}

@ObjectType("BookEdge", { implements: () => [Edge] })
export class BookEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("BookConnection", { implements: () => [Connection] })
export class BookConnection implements Connection {
  @Field((type) => [BookEdge])
  edges!: BookEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum BookOrderField {
  NAME,
}
registerEnumType(BookOrderField, {
  name: "BookOrderField",
});

@InputType()
export class BookOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => BookOrderField)
  field!: BookOrderField;
}
