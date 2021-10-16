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

@InterfaceType()
export abstract class Node {
  @Field((type) => ID)
  id!: string;
}

@InterfaceType()
export abstract class Edge {
  @Field((type) => String)
  cursor!: string;

  @Field((type) => Node)
  node!: Node;
}

@InterfaceType()
export abstract class Connection {
  @Field((type) => [Edge])
  edges!: Edge[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field((type) => Int)
  totalCount!: number;
}
