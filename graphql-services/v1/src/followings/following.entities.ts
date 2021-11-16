import {
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
  PageInfo,
} from "~/pagination/pagination.entities";

@ObjectType("Following", { implements: () => [Node] })
export class Following implements Node {
  @Field((type) => ID)
  id!: string;

  fromId!: string;
  toId!: string;
}

@ObjectType("FollowingEdge", { implements: () => [Edge] })
export class FollowingEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("FollowingConnection", { implements: () => [Connection] })
export class FollowingConnection implements Connection {
  @Field((type) => [FollowingEdge])
  edges!: FollowingEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum FollowingOrderField {
  FOLLOWED_AT,
}
registerEnumType(FollowingOrderField, {
  name: "FollowingOrderField",
});

@InputType()
export class FollowingOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => FollowingOrderField)
  field!: FollowingOrderField;
}
