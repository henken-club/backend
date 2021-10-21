import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType,
} from "@nestjs/graphql";

import { OrderDirection, PaginationArgs } from "~/pagination/pagination.types";

export enum UserActivitiesOrderField {
  CREATED_AT,
}
registerEnumType(UserActivitiesOrderField, {
  name: "UserActivitiesOrderField",
});

@InputType()
export class UserActivitiesOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => UserActivitiesOrderField)
  field!: UserActivitiesOrderField;
}

@ArgsType()
export class UserActivitiesArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  first!: number | null;

  @Field(() => String, { nullable: true })
  after!: string | null;

  @Field(() => Int, { nullable: true })
  last!: number | null;

  @Field(() => String, { nullable: true })
  before!: string | null;

  @Field(() => UserActivitiesOrder)
  orderBy!: UserActivitiesOrder;
}
