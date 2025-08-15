"use client";

import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { QueryClient } from "@tanstack/react-query";
import { chain } from "@/config/chain";

// Learn more about Tanstack Query: https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider
// We create our own query client to share our app's query cache with the AbstractWalletProvider.
const queryClient = new QueryClient();

export function NextAbstractWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // "chain" is loaded from @config/chain and is environment-aware.
    // i.e. use testnet or mainnet based on the environment (local, dev, prod)
    <AbstractWalletProvider chain={chain} queryClient={queryClient}>
      {children}
    </AbstractWalletProvider>
  );
}
