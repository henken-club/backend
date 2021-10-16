import {Module} from '@nestjs/common';
import {ConfigModule, ConfigType} from '@nestjs/config';
import {ClientsModule, Transport} from '@nestjs/microservices';

import {SearchConfig} from './search.config';
import {SearchService} from './search.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SearchGrpcClient',
        imports: [ConfigModule.forFeature(SearchConfig)],
        inject: [SearchConfig.KEY],
        useFactory: async (config: ConfigType<typeof SearchConfig>) => ({
          transport: Transport.GRPC,
          options: config.client.options,
        }),
      },
    ]),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
