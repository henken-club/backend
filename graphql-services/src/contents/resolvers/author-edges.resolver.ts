import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {AuthorsService} from '~/contents/services/authors.service';
import {
  AuthorEdgeEntity,
  AuthorEntity,
} from '~/contents/entities/author.entities';

@Resolver(() => AuthorEdgeEntity)
export class AuthorEdgesResolver {
  constructor(private readonly service: AuthorsService) {}

  @ResolveField((type) => AuthorEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: AuthorEdgeEntity): Promise<AuthorEntity> {
    return this.service.getById(node.id);
  }
}
