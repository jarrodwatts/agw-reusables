"use client"

import { useQuery } from "@tanstack/react-query"
import { useAccount, useReadContract } from "wagmi"
import { ABSTRACT_VOTING_ADDRESS, ABSTRACT_VOTING_ABI } from "../lib/voting-contract"
import { hasUserVotedForApp, formatAppId, isValidAppId } from "../lib/voting-utils"

interface UseUserVoteStatusProps {
  appId: string | number | bigint
  enabled?: boolean
}

interface UserVoteStatus {
  hasVoted: boolean
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook to check if the current user has voted for a specific app in the current epoch
 */
export function useUserVoteStatus({ appId, enabled = true }: UseUserVoteStatusProps): UserVoteStatus {
  const { address, isConnected } = useAccount()
  
  // Get current epoch
  const { data: currentEpoch, isLoading: isEpochLoading } = useReadContract({
    address: ABSTRACT_VOTING_ADDRESS,
    abi: ABSTRACT_VOTING_ABI,
    functionName: "currentEpoch",
    query: {
      enabled: enabled && isConnected,
    }
  })

  // Get user votes for current epoch
  const { 
    data: userVotes, 
    isLoading: isVotesLoading, 
    error,
    refetch 
  } = useReadContract({
    address: ABSTRACT_VOTING_ADDRESS,
    abi: ABSTRACT_VOTING_ABI,
    functionName: "getUserVotes",
    args: address && currentEpoch ? [address, currentEpoch] : undefined,
    query: {
      enabled: enabled && isConnected && !!address && !!currentEpoch && isValidAppId(appId),
    }
  })

  // Check if user has voted for this specific app
  const hasVoted = userVotes ? hasUserVotedForApp(userVotes, formatAppId(appId)) : false

  return {
    hasVoted,
    isLoading: isEpochLoading || isVotesLoading,
    error: error as Error | null,
    refetch,
  }
}