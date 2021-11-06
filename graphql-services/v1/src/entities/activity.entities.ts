import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  Int,
  InterfaceType,
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

@InterfaceType("Activity", { implements: [Node] })
export abstract class Activity {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;
}

@ObjectType("ActivityEdge", { implements: [Edge] })
export class ActivityEdge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("ActivityConnection", { implements: [Connection] })
export class ActivityConnection {
  @Field((type) => [ActivityEdge])
  edges!: ActivityEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum ActivityOrderField {
  CREATED_AT,
}
registerEnumType(ActivityOrderField, {
  name: "ActivityOrderField",
});

@InputType()
export class ActivityOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => ActivityOrderField)
  field!: ActivityOrderField;
}

@ObjectType("SendHenkenActivity", { implements: () => [Activity] })
export class SendHenkenActivity extends Activity {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  henkenId!: string;
}

@ObjectType("ReceivedHenkenActivity", { implements: () => [Activity] })
export class ReceivedHenkenActivity extends Activity {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  henkenId!: string;
}

@ObjectType("PostAnswerActivity", { implements: () => [Activity] })
export class PostAnswerActivity extends Activity {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  answerId!: string;
}

@ObjectType("ReceivedAnswerActivity", { implements: () => [Activity] })
export class ReceivedAnswerActivity extends Activity {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  answerId!: string;
}
