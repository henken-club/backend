/* eslint-disable no-console */
import {
  ApolloGateway,
  GraphQLDataSourceProcessOptions,
  RemoteGraphQLDataSource,
} from '@apollo/gateway';
import {ApolloServer} from 'apollo-server';

import {verifyToken} from './auth';

export type ServerContext = {userId: string | null};

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({
    request,
    context,
  }: GraphQLDataSourceProcessOptions<ServerContext>) {
    if ('userId' in context && context.userId) {
      request.http?.headers.set('x-account-id', context.userId);
    }
  }
}

const gateway = new ApolloGateway({
  buildService({name, url}) {
    return new AuthenticatedDataSource({url});
  },
  serviceList: [
    {name: 'main', url: process.env.SERVICE_URL_MAIN},
    {name: 'content', url: process.env.SERVICE_URL_CONTENT},
    {name: 'search', url: process.env.SERVICE_URL_SEARCH},
  ],
});

const server = new ApolloServer({
  gateway,
  async context({req}): Promise<ServerContext> {
    const authrorization = req.headers.authorization;
    if (!authrorization) return {userId: null};
    const token = authrorization.replace(/^Bearer (.*)/, '$1');
    return verifyToken(token).then(({accountId: userId}) => ({userId}));
  },
});

server
  .listen(parseInt(process.env.PORT, 10))
  .then(({url}) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((error) => {
    console.error(error);
  });
