import {
  createUnionType,
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { Author } from "./author.entities";
import { Book } from "./books.entities";
import { BookSeries } from "./bookseries.entities";
import { ContentType } from "./content.entities";
import {
  Connection,
  Edge,
  Node,
  OrderDirection,
  PageInfo,
} from "./pagination.entities";
import { TempContent } from "./temp-content.entities";

export const HenkenContentUnion = createUnionType({
  name: "HenkenContentUnion",
  types: () => [TempContent, Book, BookSeries, Author],
  resolveType(
    value:
      | { attribute: "real"; type: ContentType }
      | { attribute: "temp" },
  ) {
    if (value.attribute === "real") {
      switch (value.type) {
        case ContentType.BOOK:
          return Book;
        case ContentType.BOOK_SERIES:
          return BookSeries;
        case ContentType.AUTHOR:
          return Author;
      }
    } else if (value.attribute === "temp") {
      return TempContent;
    }
    return null;
  },
});

@ObjectType("Henken", {
  implements: () => [Node],
})
export class Henken implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  comment!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  @Field((type) => GraphQLISODateTime)
  updatedAt!: string;

  fromUserId!: string;
  toUserId!: string;
  answerId!: string | null;

  content!:
    | {
      attribute: "real";
      id: string;
      type: ContentType;
    }
    | {
      attribute: "temp";
      id: string;
    };
}

@ObjectType("HenkenEdge", { implements: () => [Edge] })
export class HenkenEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("HenkenConnection", { implements: () => [Connection] })
export class HenkenConnection implements Connection {
  @Field((type) => [HenkenEdge])
  edges!: HenkenEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum HenkenOrderField {
  CREATED_AT,
  UPDATED_AT,
}
registerEnumType(HenkenOrderField, {
  name: "HenkenOrderField",
});

@InputType()
export class HenkenOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => HenkenOrderField)
  field!: HenkenOrderField;
}
