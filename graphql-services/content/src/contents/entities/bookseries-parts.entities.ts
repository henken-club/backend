import {Field, ID, Int, ObjectType, Directive} from '@nestjs/graphql';

import {
  Connection,
  Edge,
  Node,
  PageInfoEntity,
} from '~/pagination/pagination.types';

@ObjectType('BookSeriesPart', {implements: () => [Node]})
@Directive('@key(fields: "id")')
export class BookSeriesPartEntity implements Node {
  @Field((type) => ID)
  id!: string;

  book!: {id: string};

  series!: {id: string};
}

@ObjectType('BookSeriesPartEdge', {implements: () => [Edge]})
export class BookSeriesPartEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('BookSeriesPartConnection', {implements: () => [Connection]})
export class BookSeriesPartConnectionEntity implements Connection {
  @Field((type) => [BookSeriesPartEdgeEntity])
  edges!: BookSeriesPartEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}
