import {Field, ID, Int, ObjectType, Directive} from '@nestjs/graphql';

import {
  Connection,
  Edge,
  Node,
  PageInfoEntity,
} from '~/pagination/pagination.types';

@ObjectType('Writing', {implements: () => [Node]})
@Directive('@key(fields: "id")')
export class WritingEntity implements Node {
  @Field((type) => ID)
  id!: string;

  author!: {id: string};

  book!: {id: string};
}

@ObjectType('WritingEdge', {implements: () => [Edge]})
export class WritingEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('WritingConnection', {implements: () => [Connection]})
export class WritingConnectionEntity implements Connection {
  @Field((type) => [WritingEdgeEntity])
  edges!: WritingEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}
