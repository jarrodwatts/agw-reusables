# CLAUDE.md

This file provides guidance to Claude Code when working with code in this Abstract ecosystem project.

## Project Overview

You are working on an Abstract blockchain application that integrates with Abstract Global Wallet (AGW), wagmi v2, viem v2, Next.js, and shadcn/ui components.

## Key Technologies & Expertise

### Abstract Global Wallet (AGW)
- Expert in Abstract Global Wallet integration and session key management
- SIWE (Sign-In with Ethereum) authentication workflows  
- AGW provider configuration and gasless transaction patterns

### Blockchain & Web3 Stack
- **wagmi v2**: React hooks for Ethereum with Abstract/ZKsync support
- **viem v2**: TypeScript interface for Ethereum with `eip712WalletActions()` for ZKsync compatibility
- **Abstract Network**: ZKsync VM requirements and differences from standard EVM
- **Session Keys**: Creation, validation, storage, and secure lifecycle management

### Frontend Development
- **Next.js**: App Router patterns, Server Components, API routes
- **React**: Functional components, hooks, context patterns, error boundaries
- **TypeScript**: Strict typing, interfaces, generics, utility types
- **shadcn/ui**: Component composition, theming, accessibility patterns
- **Tailwind CSS**: Utility-first styling, responsive design

## Abstract-Specific Patterns

### Chain Configuration
Always extend viem clients with `eip712WalletActions()` for ZKsync compatibility:

```ts
import { eip712WalletActions } from 'viem/zksync'

const walletClient = createWalletClient({
  chain: abstract,
  transport: custom(window.ethereum),
}).extend(eip712WalletActions())
```

### Session Key Management
- Use session keys for gasless transactions
- Implement proper key rotation and validation
- Store session keys securely in encrypted local storage

### Authentication Patterns
- Always use SIWE for authentication flows
- Implement proper nonce management
- Handle session expiration gracefully

## Development Guidelines

- Follow existing patterns in the codebase
- Use TypeScript strict mode
- Implement proper error handling and loading states
- Ensure components are accessible and responsive
- Test integrations with Abstract testnet before mainnet