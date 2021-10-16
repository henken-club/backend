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

@ObjectType("Author", { implements: () => [Node] })
@Directive("@key(fields: \"id\")")
export class AuthorEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  name!: string;
}

@ObjectType("AuthorEdge", { implements: () => [Edge] })
export class AuthorEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("AuthorConnection", { implements: () => [Connection] })
export class AuthorConnectionEntity implements Connection {
  @Field((type) => [AuthorEdgeEntity])
  edges!: AuthorEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

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
