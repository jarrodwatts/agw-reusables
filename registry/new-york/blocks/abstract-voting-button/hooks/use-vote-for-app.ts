"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAccount, useReadContract, useChainId } from "wagmi"
import { useAbstractClient } from "@abstract-foundation/agw-react"
import { ABSTRACT_VOTING_ADDRESS, ABSTRACT_VOTING_ABI } from "../lib/voting-contract"
import { formatAppId, isValidAppId, VotingConfigurationError } from "../lib/voting-utils"
import { abstract } from "viem/chains"

interface UseVoteForAppProps {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

interface VoteForAppResult {
  voteForApp: (appId: string | number | bigint) => Promise<`0x${string}`>
  isLoading: boolean
  error: Error | null
  data: any
  reset: () => void
}

/**
 * Hook to submit a vote for an app using Abstract Global Wallet
 */
export function useVoteForApp({ onSuccess, onError }: UseVoteForAppProps = {}): VoteForAppResult {
  const { isConnected } = useAccount()
  const { data: abstractClient } = useAbstractClient()
  const chainId = useChainId()
  const queryClient = useQueryClient()

  // Get vote cost from contract
  const { data: voteCost, error: voteCostError, isLoading: isVoteCostLoading } = useReadContract({
    address: ABSTRACT_VOTING_ADDRESS,
    abi: ABSTRACT_VOTING_ABI,
    functionName: "voteCost",
    query: {
      enabled: isConnected,
    }
  })

  // Debug logging
  console.log("Vote cost query:", { voteCost, voteCostError, isVoteCostLoading, isConnected })

  // Create mutation for voting
  const mutation = useMutation({
    mutationFn: async (appId: string | number | bigint) => {
      if (!isConnected) {
        throw new Error("Wallet not connected")
      }

      if (chainId !== abstract.id) {
        throw new VotingConfigurationError(
          "Abstract Voting requires Abstract Mainnet but app is configured for testnet.\n\n" +
          "To fix this:\n" +
          "1. Update your AGWProvider to use Abstract Mainnet:\n" +
          '   import { abstract } from "viem/chains"\n' +
          '   <AbstractWalletProvider chain={abstract}>\n' +
          "2. Or remove voting components when using testnet\n\n" +
          "Note: Voting is only available on Abstract Mainnet (chain ID 2741)"
        )
      }

      if (!abstractClient) {
        throw new Error("Abstract client not available")
      }

      if (!isValidAppId(appId)) {
        throw new Error("Invalid app ID")
      }

      if (voteCost === null || voteCost === undefined) {
        console.error("Vote cost error details:", { voteCostError, isVoteCostLoading })
        throw new Error(`Unable to get vote cost from contract. Error: ${voteCostError?.message || 'Unknown error'}`)
      }

      const formattedAppId = formatAppId(appId)

      // Submit the vote transaction using Abstract client
      const hash = await abstractClient.writeContract({
        address: ABSTRACT_VOTING_ADDRESS,
        abi: ABSTRACT_VOTING_ABI,
        functionName: "voteForApp",
        args: [formattedAppId],
        value: voteCost,
      })

      return hash
    },
    onSuccess: (data) => {
      // Invalidate queries to refresh vote status
      queryClient.invalidateQueries({
        queryKey: ["contract", { address: ABSTRACT_VOTING_ADDRESS }]
      })
      onSuccess?.(data)
    },
    onError: (error: Error) => {
      onError?.(error)
    },
  })

  return {
    voteForApp: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error as Error | null,
    data: mutation.data,
    reset: mutation.reset,
  }
}