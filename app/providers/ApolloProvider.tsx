'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PropsWithChildren } from 'react';
import config from '../config/contentful';

type ApolloAppProviderProps = PropsWithChildren;

const client = new ApolloClient({
  uri: `${config.baseUrl}`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          propertyCollection: {
            keyArgs: false,
            merge(existing, incoming, { args }) {
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.items.length; ++i) {
                merged[args?.skip + i] = incoming.items[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
  headers: {
    ...(config.accessToken ? { Authorization: `Bearer ${config.accessToken}` } : {}),
  },
});

export default function ApolloAppProvider({ children }: ApolloAppProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
