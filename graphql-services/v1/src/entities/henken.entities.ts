import {
  Field,
  GraphQLISODateTime,
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
  PageInfo,
} from "./pagination.entities";

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
      type: "real";
      contentId: string;
      contentType: "BOOK" | "BOOK_SERIES" | "AUTHOR";
    }
    | {
      type: "temp";
      contentId: string;
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
