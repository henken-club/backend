import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {BookSeriesService} from '~/contents/services/bookseries.service';
import {
  BookSeriesEdgeEntity,
  BookSeriesEntity,
} from '~/contents/entities/bookseries.entities';

@Resolver(() => BookSeriesEdgeEntity)
export class BookSeriesEdgesResolver {
  constructor(private readonly service: BookSeriesService) {}

  @ResolveField((type) => BookSeriesEntity, {name: 'node'})
  async resolveNode(
    @Parent() {node}: BookSeriesEdgeEntity,
  ): Promise<BookSeriesEntity> {
    return this.service.getById(node.id);
  }
}
