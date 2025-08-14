"use client"

import { chain } from "@/config/chain"
import { AbstractWalletProvider } from "@abstract-foundation/agw-react"

export function AGWProvider({ children }: { children: React.ReactNode }) {
  return (
    <AbstractWalletProvider chain={chain}>
      {children}
    </AbstractWalletProvider>
  )
}