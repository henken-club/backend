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
export abstract class Activity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;
}

@ObjectType("ActivityEdge", { implements: () => [Edge] })
export class ActivityEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("ActivityConnection", { implements: () => [Connection] })
export class ActivityConnection implements Connection {
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

@ObjectType("CreateHenkenActivity", { implements: () => [Node, Activity] })
export class CreateHenkenActivity extends Activity {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;
}
