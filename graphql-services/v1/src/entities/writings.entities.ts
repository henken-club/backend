import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

import { Connection, Edge, Node, PageInfo } from "./pagination.entities";

@ObjectType("Writing", { implements: () => [Node] })
export class Writing implements Node {
  @Field((type) => ID)
  id!: string;

  author!: { id: string };

  book!: { id: string };
}

@ObjectType("WritingEdge", { implements: () => [Edge] })
export class WritingEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("WritingConnection", { implements: () => [Connection] })
export class WritingConnection implements Connection {
  @Field((type) => [WritingEdge])
  edges!: WritingEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}
