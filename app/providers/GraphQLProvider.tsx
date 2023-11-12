'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

type GraphQLProviderProps = PropsWithChildren;

const client = new QueryClient();

export default function GraphQLProvider({ children }: GraphQLProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
