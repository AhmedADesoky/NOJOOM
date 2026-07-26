import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const Apollo_Client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || 'http://localhost:4000/graphql',
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
