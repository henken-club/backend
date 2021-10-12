import {Module} from '@nestjs/common';

import {UpserterModule} from './upserter/upserter.module';

@Module({
  imports: [UpserterModule],
})
export class AppModule {}
