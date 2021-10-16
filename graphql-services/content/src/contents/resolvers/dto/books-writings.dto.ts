import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType,
} from '@nestjs/graphql';

import {OrderDirection, PaginationArgs} from '~/pagination/pagination.types';

export enum BookWritingsOrderField {
  AUTHOR_NAME,
}
registerEnumType(BookWritingsOrderField, {
  name: 'BookWritingsOrderField',
});

@InputType()
export class BookWritingsOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => BookWritingsOrderField)
  field!: BookWritingsOrderField;
}

@ArgsType()
export class BookWritingsArgs extends PaginationArgs {
  @Field(() => Int, {nullable: true})
  first!: number | null;

  @Field(() => String, {nullable: true})
  after!: string | null;

  @Field(() => Int, {nullable: true})
  last!: number | null;

  @Field(() => String, {nullable: true})
  before!: string | null;

  @Field(() => BookWritingsOrder)
  orderBy!: BookWritingsOrder;
}
