import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const httplink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URL,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httplink,
  cache,
});

export default client;
