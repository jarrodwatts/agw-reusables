import type { Address, Abi } from "viem"

export interface ContractAddress {
  mainnet?: Address
  testnet?: Address
}

export interface ContractInfo {
  name: string
  description: string
  addresses: ContractAddress
  abi?: Abi
}

export interface ContractsConfig {
  tokens: Record<string, ContractInfo>
  dex: Record<string, ContractInfo>
}

export type NetworkId = 2741 | 11124 // Abstract mainnet | Abstract testnet

export interface UseContractAddressOptions {
  chainId?: NetworkId
  throwOnMissing?: boolean
}