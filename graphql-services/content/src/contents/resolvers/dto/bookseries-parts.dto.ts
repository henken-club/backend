import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType,
} from "@nestjs/graphql";

import { OrderDirection, PaginationArgs } from "~/pagination/pagination.types";

export enum BookSeriesPartsOrderField {
  ORDER,
}
registerEnumType(BookSeriesPartsOrderField, {
  name: "BookSeriesPartsOrderField",
});

@InputType()
export class BookSeriesPartsOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => BookSeriesPartsOrderField)
  field!: BookSeriesPartsOrderField;
}

@ArgsType()
export class BookSeriesPartsArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  first!: number | null;

  @Field(() => String, { nullable: true })
  after!: string | null;

  @Field(() => Int, { nullable: true })
  last!: number | null;

  @Field(() => String, { nullable: true })
  before!: string | null;

  @Field(() => BookSeriesPartsOrder)
  orderBy!: BookSeriesPartsOrder;
}
