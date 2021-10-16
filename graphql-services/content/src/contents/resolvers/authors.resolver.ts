import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import {AuthorWritingsArgs} from './dto/authors-writings.dto';
import {FindAuthorArgs, FindAuthorPayload} from './dto/find-author.dto';
import {ManyAuthorsArgs} from './dto/many-authors.dto';

import {AuthorsService} from '~/contents/services/authors.service';
import {
  AuthorConnectionEntity,
  AuthorEntity,
} from '~/contents/entities/author.entities';
import {WritingConnectionEntity} from '~/contents/entities/writings.entities';

@Resolver(() => AuthorEntity)
export class AuthorsResolver {
  constructor(private readonly authors: AuthorsService) {}

  @ResolveReference()
  resolveReference(reference: {id: string}) {
    return this.authors.getById(reference.id);
  }

  @ResolveField(() => WritingConnectionEntity, {name: 'writings'})
  resolveWritings(
    @Parent() {id}: AuthorEntity,
    @Args()
    {orderBy, ...pagination}: AuthorWritingsArgs,
  ) {
    return this.authors.getWritings(
      id,
      pagination,
      this.authors.convertWritingOrderBy(orderBy),
    );
  }

  @Query(() => AuthorEntity, {name: 'author'})
  async getAuthor(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<AuthorEntity> {
    return this.authors.getById(id);
  }

  @Query(() => FindAuthorPayload, {name: 'findAuthor'})
  async findAuthor(
    @Args({type: () => FindAuthorArgs}) {id}: FindAuthorArgs,
  ): Promise<FindAuthorPayload> {
    const result = await this.authors.findById({id});
    return {author: result};
  }

  @Query(() => AuthorConnectionEntity, {name: 'manyAuthors'})
  async manyAuthors(
    @Args({type: () => ManyAuthorsArgs})
    {orderBy, ...pagination}: ManyAuthorsArgs,
  ): Promise<AuthorConnectionEntity> {
    return this.authors.getMany(
      pagination,
      this.authors.convertOrderBy(orderBy),
    );
  }
}
