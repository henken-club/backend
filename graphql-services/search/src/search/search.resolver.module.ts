import {Module} from '@nestjs/common';

import {SearchModule} from './search.module';
import {SearchResolver} from './search.resolver';

@Module({
  imports: [SearchModule],
  providers: [SearchResolver],
  exports: [SearchResolver],
})
export class SearchResolverModule {}
