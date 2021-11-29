import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

import {
  Connection,
  Edge,
  Node,
  PageInfo,
} from "~/pagination/pagination.entities";

@ObjectType("BookSeriesPart", { implements: () => [Node] })
export class BookSeriesPart implements Node {
  @Field((type) => ID)
  id!: string;

  book!: { id: string };

  series!: { id: string };
}

@ObjectType("BookSeriesPartEdge", { implements: () => [Edge] })
export class BookSeriesPartEdge implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: { id: string };
}

@ObjectType("BookSeriesPartConnection", {
  implements: () => [Connection],
})
export class BookSeriesPartConnection implements Connection {
  @Field((type) => [BookSeriesPartEdge])
  edges!: BookSeriesPartEdge[];

  @Field((type) => PageInfo)
  pageInfo!: PageInfo;

  @Field(() => Int)
  totalCount!: number;
}
