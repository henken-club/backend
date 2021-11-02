import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType,
} from "@nestjs/graphql";

import {
  OrderDirection,
  PaginationArgs,
} from "~/entities/pagination/pagination.types";

export enum AuthorWritingsOrderField {
  BOOK_TITLE,
}
registerEnumType(AuthorWritingsOrderField, {
  name: "AuthorWritingOrderField",
});

@InputType()
export class AuthorWritingsOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => AuthorWritingsOrderField)
  field!: AuthorWritingsOrderField;
}

@ArgsType()
export class AuthorWritingsArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  first!: number | null;

  @Field(() => String, { nullable: true })
  after!: string | null;

  @Field(() => Int, { nullable: true })
  last!: number | null;

  @Field(() => String, { nullable: true })
  before!: string | null;

  @Field(() => AuthorWritingsOrder)
  orderBy!: AuthorWritingsOrder;
}
