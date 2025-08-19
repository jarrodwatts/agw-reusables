# CLAUDE.md

This file provides guidance to Claude Code when working with code in this Abstract ecosystem project.

## Project Overview

AGW Reusables is a collection of components and utilities for building web3 applications with Abstract Global Wallet (AGW) on Abstract. It is built on top of the shadcn/ui package which uses Tailwind for styling and is powered by the shadcn registry.

## Abstract & Web3 Development

### Abstract Blockchain
Abstract is a Layer 2 (L2) network built on top of Ethereum, designed to securely power consumer-facing blockchain applications at scale with low fees and fast transaction speeds.

- `abstract` is the mainnet chain available in the @/config/chain.ts file
- `abstractTestnet` is the testnet chain available in the @/config/chain.ts file

### Abstract Global Wallet (AGW)
Abstract Global Wallet (AGW) is a cross-application smart contract wallet that users can create to interact with any application built on Abstract, powered by native account abstraction. AGW is integrated via hooks from `@abstract-foundation/agw-react` and utilities from `@abstract-foundation/agw-client` packages.

### Web3 Development Priority Order
When building on-chain functionality, consider in this order:

1. Is there an Abstract Global Wallet library hook from the `@abstract-foundation/agw-react` package?
2. Is there a function from the `@abstract-foundation/agw-client` package for blockchain interaction?
3. Are there built-in Wagmi hooks that can accomplish this? (AGW is compatible with all Wagmi hooks such as `useAccount()`, `useBalance()`, `useContractRead()`, `useContractWrite()`, `useSendTransaction()`, `useSignMessage()`, `useSignTransaction()`, `useSignTypedData()`, `useSwitchChain()`, `useWaitForTransactionReceipt()`, etc.)
4. Can we use the Viem clients installed in @/config/viem-clients.ts?

### Wagmi, Viem, and ZKsync
- Viem documentation specific to Abstract: https://viem.sh/zksync/
- AGW libraries work seamlessly with Viem and Wagmi
- All hooks and functions work with `abstract` and `abstractTestnet` chains

### Troubleshooting
If we run into issues related to "must be called within a wagmi provider", it likely means the user has not properly wrapped their application in the `AGWProvider` component, which includes the `WagmiProvider` and `QueryClientProvider`.

## Installation & Setup

Follow the steps below to start using AGW Reusables:

1. **Setup your project**
Create a new project or configure an existing one using the shadcn init command:
```bash
pnpm dlx shadcn@latest init
```

2. **Install the AGW Provider**
Install the required wrapper component:
```bash
pnpm dlx shadcn@latest add "https://build.abs.xyz/r/agw-provider.json"
```

3. **Wrap your application**
Wrap your application in the installed component inside app/layout.tsx:
```tsx
import { NextAbstractWalletProvider } from "@/components/agw-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <NextAbstractWalletProvider>
        <body>
          {children}
          <Toaster />
        </body>
      </NextAbstractWalletProvider>
    </html>
  );
}
```

## Using Components

### AGW Components
Import components from the ui directory using the configured aliases:

```tsx
"use client"

import { ConnectWalletButton } from "@/components/connect-wallet-button"

export default function ConnectWalletButtonDemo() {
  return (
    <div className="flex justify-center">
      <ConnectWalletButton />
    </div>
  )
}
```

### Shadcn/UI Components
Import components from the ui directory using the configured aliases:

```tsx
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
```

Example usage:
```tsx
<Button variant="outline">Click me</Button>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

## Installing Additional Components

### AGW Components
To install additional components, use the Shadcn CLI:

```bash
pnpm dlx shadcn@latest add "https://build.abs.xyz/r/connect-wallet-button.json"
```

Some commonly used components are:
- connect-wallet-button
- siwe-button
- onboarding-dialog
- session-keys
- abstract-profile
- abstract-app-voting
- nft-card
- abstract-contracts
- cursor-ai-config
- claude-config
- use-optimistic-write-contract

### Shadcn/UI Components
Many more components are available but not currently installed. You can view the complete list at https://ui.shadcn.com/r

To install additional components, use the Shadcn CLI:

```bash
pnpm dlx shadcn@latest add [component-name]
```

For example, to add the Accordion component:
```bash
pnpm dlx shadcn@latest add accordion
```

Note: `npx shadcn-ui@latest` is deprecated, use `npx shadcn@latest` instead

Some commonly used components are:
- Accordion
- Alert
- AlertDialog
- AspectRatio
- Avatar
- Calendar
- Checkbox
- Collapsible
- Command
- ContextMenu
- DataTable
- DatePicker
- Dropdown Menu
- Form
- Hover Card
- Menubar
- Navigation Menu
- Popover
- Progress
- Radio Group
- ScrollArea
- Select
- Separator
- Sheet
- Skeleton
- Slider
- Switch
- Table
- Textarea
- Toast
- Toggle
- Tooltip

## Component Styling

This project uses the "new-york" style variant with the "neutral" base color and CSS variables for theming, as configured in `components.json`.

## Development Guidelines

- Follow existing patterns in the codebase
- Use TypeScript strict mode
- Implement proper error handling and loading states
- Ensure components are accessible and responsive
- Always use pnpm for commands