"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAccount, useReadContract } from "wagmi"
import { useAbstractClient } from "@abstract-foundation/agw-react"
import { publicClient } from "@/config/viem-clients"
import { ABSTRACT_VOTING_ADDRESS, ABSTRACT_VOTING_ABI } from "../lib/voting-contract"
import { formatAppId, isValidAppId } from "../lib/voting-utils"

interface UseVoteForAppProps {
  onSuccess?: (data: `0x${string}`) => void
  onError?: (error: Error) => void
}

interface VoteForAppResult {
  voteForApp: (appId: string | number | bigint) => Promise<`0x${string}`>
  isLoading: boolean
  error: Error | null
  data: `0x${string}` | undefined
  reset: () => void
}

/**
 * Hook to submit a vote for an app using Abstract Global Wallet
 */
export function useVoteForApp({ onSuccess, onError }: UseVoteForAppProps = {}): VoteForAppResult {
  const { isConnected, address } = useAccount()
  const { data: abstractClient } = useAbstractClient()
  const queryClient = useQueryClient()

  // Get the current epoch to build the proper query key
  const { data: currentEpoch } = useReadContract({
    address: ABSTRACT_VOTING_ADDRESS,
    abi: ABSTRACT_VOTING_ABI,
    functionName: "currentEpoch",
    query: { enabled: false }, // Don't fetch, just get the query key structure
  })

  // Get the getUserVotes query key for invalidation
  const { queryKey } = useReadContract({
    address: ABSTRACT_VOTING_ADDRESS,
    abi: ABSTRACT_VOTING_ABI,
    functionName: "getUserVotes",
    args: address && currentEpoch ? [address, currentEpoch] : undefined,
    query: { enabled: false }, // Don't fetch, just get the query key
  })

  // Create mutation for voting
  const mutation = useMutation({
    mutationFn: async (appId: string | number | bigint) => {
      if (!isConnected) {
        throw new Error("Wallet not connected")
      }

      if (!abstractClient) {
        throw new Error("Abstract client not available")
      }

      if (!isValidAppId(appId)) {
        throw new Error(`Invalid app ID for voting. App ID: ${appId}`)
      }

      const formattedAppId = formatAppId(appId)

      // Submit the vote transaction using Abstract client
      const hash = await abstractClient.writeContract({
        address: ABSTRACT_VOTING_ADDRESS,
        abi: ABSTRACT_VOTING_ABI,
        functionName: "voteForApp",
        args: [formattedAppId],
      })

      // Wait for transaction to be confirmed on-chain
      await publicClient.waitForTransactionReceipt({ hash })

      return hash
    },
    onSuccess: async (data) => {
      // Invalidate getUserVotes queries using the proper wagmi query key
      await queryClient.invalidateQueries({ queryKey })
      
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