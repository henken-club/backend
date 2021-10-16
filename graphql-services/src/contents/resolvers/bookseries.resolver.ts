import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import {
  FindBookSeriesArgs,
  FindBookSeriesPayload,
} from './dto/find-bookseries.dto';
import {BookSeriesPartsArgs} from './dto/bookseries-parts.dto';
import {ManyBookSeriesArgs} from './dto/many-bookseries.dto';

import {BookSeriesService} from '~/contents/services/bookseries.service';
import {BookSeriesPartConnectionEntity} from '~/contents/entities/bookseries-parts.entities';
import {
  BookSeriesConnectionEntity,
  BookSeriesEntity,
} from '~/contents/entities/bookseries.entities';

@Resolver(() => BookSeriesEntity)
export class BookSeriesResolver {
  constructor(private readonly bookSeries: BookSeriesService) {}

  @ResolveReference()
  resolveReference(reference: {id: string}) {
    return this.bookSeries.getById(reference.id);
  }

  @ResolveField(() => BookSeriesPartConnectionEntity, {name: 'parts'})
  async resolveAuthor(
    @Parent() {id}: BookSeriesEntity,
    @Args()
    {orderBy, ...pagination}: BookSeriesPartsArgs,
  ): Promise<BookSeriesPartConnectionEntity> {
    return this.bookSeries.getParts(
      id,
      pagination,
      this.bookSeries.convertPartsOrderBy(orderBy),
    );
  }

  @Query(() => BookSeriesEntity, {name: 'bookSeries'})
  async getBookSeries(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<BookSeriesEntity> {
    return this.bookSeries.getById(id);
  }

  @Query(() => FindBookSeriesPayload, {name: 'findBookSeries'})
  async findBookSeries(
    @Args({type: () => FindBookSeriesArgs}) {id}: FindBookSeriesArgs,
  ): Promise<FindBookSeriesPayload> {
    const result = await this.bookSeries.findById({id});
    return {bookSeries: result};
  }

  @Query(() => BookSeriesConnectionEntity, {name: 'manyBookSeries'})
  async manyBookSeries(
    @Args({type: () => ManyBookSeriesArgs})
    {orderBy, ...pagination}: ManyBookSeriesArgs,
  ): Promise<BookSeriesConnectionEntity> {
    return this.bookSeries.getMany(
      pagination,
      this.bookSeries.convertOrderBy(orderBy),
    );
  }
}
