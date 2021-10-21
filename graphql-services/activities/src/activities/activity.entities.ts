import {
  Field,
  ID,
  Int,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

import {
  ConnectionInterface,
  EdgeInterface,
  NodeInterface,
  PageInfoEntity,
} from "../pagination/pagination.types";

export enum ActivityType {
  RECEIVED_HENKEN,
  RECEIVED_ANSWER,
}
registerEnumType(ActivityType, {
  name: "ActivityType",
});

@InterfaceType("Activity", {
  resolveType({ type }: ActivityInterface) {
    switch (type) {
      case ActivityType.RECEIVED_HENKEN:
        return ReceivedHenkenActivity;
      case ActivityType.RECEIVED_ANSWER:
        return ReceivedAnswerActivity;
    }
    return null;
  },
})
export abstract class ActivityInterface {
  @Field((type) => ID)
  id!: string;

  type!: ActivityType;
}

@ObjectType("ActivityEdge", { implements: () => [EdgeInterface] })
export class ActivityEdgeEntity implements EdgeInterface {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("ActivityConnection", { implements: () => [ConnectionInterface] })
export class ActivityConnectionEntity implements ConnectionInterface {
  @Field((type) => [ActivityEdgeEntity])
  edges!: ActivityEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

@ObjectType("ReceivedHenkenActivity", {
  implements: () => [ActivityInterface, NodeInterface],
})
export class ReceivedHenkenActivity implements ActivityInterface {
  @Field((type) => ID)
  id!: string;

  type!: ActivityType.RECEIVED_HENKEN;
}

@ObjectType("ReceivedAnswerActivity", {
  implements: () => [ActivityInterface, NodeInterface],
})
export class ReceivedAnswerActivity implements ActivityInterface {
  @Field((type) => ID)
  id!: string;

  type!: ActivityType.RECEIVED_ANSWER;
}
