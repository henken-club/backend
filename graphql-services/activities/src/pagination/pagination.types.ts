import {
  Field,
  ID,
  Int,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";

@ObjectType("PageInfo")
export class PageInfoEntity {
  @Field((type) => Boolean)
  hasNextPage!: boolean;

  @Field((type) => Boolean)
  hasPreviousPage!: boolean;

  @Field((type) => String, { nullable: true })
  startCursor?: string;

  @Field((type) => String, { nullable: true })
  endCursor?: string;
}

export enum OrderDirection {
  ASC = "asc",
  DESC = "desc",
}
registerEnumType(OrderDirection, {
  name: "OrderDirection",
});

export abstract class PaginationArgs {
  first!: number | null;
  after!: string | null;

  last!: number | null;
  before!: string | null;
}

@InterfaceType("Node")
export abstract class NodeInterface {
  @Field((type) => ID)
  id!: string;
}

@InterfaceType("Edge")
export abstract class EdgeInterface {
  @Field((type) => String)
  cursor!: string;

  @Field((type) => NodeInterface)
  node!: NodeInterface;
}

@InterfaceType("Connection")
export abstract class ConnectionInterface {
  @Field((type) => [EdgeInterface])
  edges!: EdgeInterface[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field((type) => Int)
  totalCount!: number;
}
