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

@ObjectType("Answer", {
  implements: () => [Node],
})
export class Answer implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => AnswerType)
  type!: AnswerType;

  @Field((type) => String)
  comment!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  @Field((type) => GraphQLISODateTime)
  updatedAt!: string;

  henkenId!: string;
}

export enum AnswerType {
  RIGHT,
  WRONG,
}
registerEnumType(AnswerType, {
  name: "AnswerType",
});

@ObjectType("AnswerEdge", { implements: () => [Edge] })
export class AnswerEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("AnswerConnection", { implements: () => [Connection] })
export class AnswerConnection implements Connection {
  @Field((type) => [AnswerEdge])
  edges!: AnswerEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum AnswerOrderField {
  CREATED_AT,
  UPDATED_AT,
}
registerEnumType(AnswerOrderField, {
  name: "AnswerOrderField",
});

@InputType()
export class AnswerOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => AnswerOrderField)
  field!: AnswerOrderField;
}
