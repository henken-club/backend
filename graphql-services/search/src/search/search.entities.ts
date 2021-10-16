import {Field, ObjectType} from '@nestjs/graphql';

import {Content as SearchContent} from '~/content/content.entities';

@ObjectType('SearchResult')
export class SearchResultEntity {
  @Field((type) => SearchContent)
  content!: SearchContent;
}
