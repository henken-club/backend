import { ArgsType, Field, Int } from "@nestjs/graphql";

import { NotificationOrder } from "~/notifications/notifications.entities";
import { PaginationArgs } from "~/pagination/pagination.entities";

@ArgsType()
export class GetNotificationsArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  first!: number | null;

  @Field(() => String, { nullable: true })
  after!: string | null;

  @Field(() => Int, { nullable: true })
  last!: number | null;

  @Field(() => String, { nullable: true })
  before!: string | null;

  @Field(() => NotificationOrder)
  orderBy!: NotificationOrder;
}
