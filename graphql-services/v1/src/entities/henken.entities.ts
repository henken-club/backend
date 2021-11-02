import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import { Content } from "./content/content.entities";
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
  createdAt!: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt!: Date;

  from!: { id: string };
  to!: { id: string };

  answer!: { id: string } | null;

  @Field(() => Content)
  content!: Content;
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
