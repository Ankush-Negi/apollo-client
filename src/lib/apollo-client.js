import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import ls from 'local-storage';
import { setContext } from 'apollo-link-context';

const httplink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URL,
});

const setAuthLink = setContext((_, { headers }) => {
  const token = ls.get('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: setAuthLink.concat(httplink),
  cache,
});

export default client;
