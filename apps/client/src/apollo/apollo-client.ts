import { WebSocketLink } from '@apollo/link-ws';
import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ApolloClient, ApolloLink, split } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { getMainDefinition } from '@apollo/client/utilities';

loadDevMessages();
loadErrorMessages();

const getToken = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

const authLink = setContext(async (_, { headers }) => {
  const token = getToken('__session');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/graphql',
  options: {
    connectionParams: async () => {
      const token = localStorage.getItem('clerk-db-jwt');
      if (token) return { Authorization: token ? `Bearer ${token}` : '' };
    },
    connectionCallback(error, result) {
      if (error) console.log(error);
      if (result) console.log(result);
    },
  },
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
  headers: {
    'apollo-require-preflight': 'true',
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, uploadLink])
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: splitLink,
  cache,
  credentials: 'include',
});

export default client;
