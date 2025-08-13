import type { NetworkId, ContractAddress, ContractInfo } from "./types"
import { ABSTRACT_CONTRACTS } from "./contracts"
import { abstract, abstractTestnet } from "viem/chains"
import { chain } from "@/config/chain"
import type { Address } from "viem"

export function getNetworkName(chainId: NetworkId): string {
  switch (chainId) {
    case abstract.id:
      return "Abstract Mainnet"
    case abstractTestnet.id:
      return "Abstract Testnet"
    default:
      return "Unknown Network"
  }
}

export function isAbstractNetwork(chainId: number): chainId is NetworkId {
  return chainId === abstract.id || chainId === abstractTestnet.id
}

export function getContractAddress(
  addresses: ContractAddress,
  chainId: NetworkId,
): Address {
  const address = chainId === abstract.id ? addresses.mainnet : addresses.testnet

  if (!address) {
    const networkName = getNetworkName(chainId)
    throw new Error(`Contract address not available on ${networkName}`)
  }

  return address
}

function findContractInCategories(contractKey: string): ContractInfo | null {
  for (const category of Object.values(ABSTRACT_CONTRACTS)) {
    if (typeof category === 'object' && category[contractKey]) {
      return category[contractKey]
    }
  }
  return null
}

export function findContract(contractKey: string): ContractInfo | null {
  return findContractInCategories(contractKey)
}

export function getContract(contractKey: string, chainId: NetworkId): ContractInfo & { address: Address } {
  const contract = findContractInCategories(contractKey)

  if (!contract) {
    throw new Error(`Contract "${contractKey}" not found`)
  }

  if (!isAbstractNetwork(chainId)) {
    throw new Error(`Unsupported chain ID: ${chainId}. Only Abstract networks are supported.`)
  }

  const address = getContractAddress(contract.addresses, chainId)

  return {
    ...contract,
    address
  }
}

// Convenience function that uses the current chain configuration
export function getContractWithCurrentChain(contractKey: string): ContractInfo & { address: Address } {
  return getContract(contractKey, chain.id as NetworkId)
}

// Convenience function to get contract address with current chain
export function getContractAddressWithCurrentChain(contractKey: string): Address {
  const contract = findContractInCategories(contractKey)
  
  if (!contract) {
    throw new Error(`Contract "${contractKey}" not found`)
  }

  const address = getContractAddress(contract.addresses, chain.id as NetworkId)
  
  if (!address) {
    throw new Error(`Contract address not available for "${contractKey}" on current chain`)
  }

  return address
}