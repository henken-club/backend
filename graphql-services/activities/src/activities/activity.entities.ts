import {
  Field,
  ID,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

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

@ObjectType("ReceivedHenkenActivity", { implements: () => [ActivityInterface] })
export class ReceivedHenkenActivity implements ActivityInterface {
  @Field((type) => ID)
  id!: string;

  type!: ActivityType.RECEIVED_HENKEN;
}

@ObjectType("ReceivedAnswerActivity", { implements: () => [ActivityInterface] })
export class ReceivedAnswerActivity implements ActivityInterface {
  @Field((type) => ID)
  id!: string;

  type!: ActivityType.RECEIVED_ANSWER;
}
