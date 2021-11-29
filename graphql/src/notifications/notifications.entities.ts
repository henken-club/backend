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
} from "~/pagination/pagination.entities";

@InterfaceType("Notification", { implements: [Node] })
export abstract class Notification {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  @Field((type) => Boolean)
  read!: boolean;
}

@ObjectType("NotificationEdge", { implements: [Edge] })
export class NotificationEdge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("NotificationConnection", { implements: [Connection] })
export class NotificationConnection {
  @Field((type) => [NotificationEdge])
  edges!: NotificationEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}

export enum NotificationOrderField {
  CREATED_AT,
}
registerEnumType(NotificationOrderField, {
  name: "NotificationOrderField",
});

@InputType()
export class NotificationOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => NotificationOrderField)
  field!: NotificationOrderField;
}

@ObjectType("ReceivedHenkenNotification", {
  implements: () => [Notification],
})
export class ReceivedHenkenNotification extends Notification {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  @Field((type) => Boolean)
  read!: boolean;

  henkenId!: string;
}

@ObjectType("ReceivedAnswerNotification", {
  implements: () => [Notification],
})
export class ReceivedAnswerNotification extends Notification {
  @Field((type) => ID)
  id!: string;

  @Field((type) => GraphQLISODateTime)
  createdAt!: string;

  @Field((type) => Boolean)
  read!: boolean;

  answerId!: string;
}
