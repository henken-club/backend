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
} from "./pagination/pagination.types";

@ObjectType("User", { implements: () => [Node] })
export class User implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  alias!: string;

  @Field((type) => String)
  displayName!: string;

  @Field((type) => String)
  avatar!: string;
}

@ObjectType("UserEdge", { implements: () => [Edge] })
export class UserEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("UserConnection", { implements: () => [Connection] })
export class UserConnection implements Connection {
  @Field((type) => [UserEdge])
  edges!: UserEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum UserOrderField {
  CREATED_AT,
}
registerEnumType(UserOrderField, {
  name: "UserOrderField",
});

@InputType("UserOrder")
export class UserOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => UserOrderField)
  field!: UserOrderField;
}
