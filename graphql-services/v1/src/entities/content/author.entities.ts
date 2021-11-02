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
} from "../pagination/pagination.types";

import { Content } from "./content.entities";

@ObjectType("Author", { implements: () => [Content, Node] })
export class Author implements Content, Node {
  type!: "AUTHOR";

  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  name!: string;
}

@ObjectType("AuthorEdge", { implements: () => [Edge] })
export class AuthorEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("AuthorConnection", { implements: () => [Connection] })
export class AuthorConnection implements Connection {
  @Field((type) => [AuthorEdge])
  edges!: AuthorEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum AuthorOrderField {
  ID,
}
registerEnumType(AuthorOrderField, {
  name: "AuthorOrderField",
});

@InputType()
export class AuthorOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => AuthorOrderField)
  field!: AuthorOrderField;
}
