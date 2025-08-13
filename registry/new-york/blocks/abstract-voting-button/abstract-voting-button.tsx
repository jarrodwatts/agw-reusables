"use client"

import { useLoginWithAbstract } from "@abstract-foundation/agw-react"
import { Button } from "@/registry/new-york/ui/button"
import { useAccount } from "wagmi"
import { cn } from "@/lib/utils"
import { type ClassValue } from "clsx"
import { useState } from "react"
import { useUserVoteStatus } from "./hooks/use-user-vote-status"
import { useVoteForApp } from "./hooks/use-vote-for-app"

interface AbstractVotingButtonProps {
  appId: string | number | bigint
  className?: ClassValue
  children?: React.ReactNode
  onVoteSuccess?: (data: any) => void
  onVoteError?: (error: Error) => void
  disabled?: boolean
}

/**
 * Abstract Voting Button
 * 
 * A voting button component that handles:
 * - Checking if user has already voted for an app
 * - Wallet connection via Abstract Global Wallet
 * - Submitting votes with proper loading states
 * - Error handling and user feedback
 */
export function AbstractVotingButton({
  appId,
  className,
  children,
  onVoteSuccess,
  onVoteError,
  disabled = false
}: AbstractVotingButtonProps) {
  const { isConnected } = useAccount()
  const { login } = useLoginWithAbstract()
  const [isVoting, setIsVoting] = useState(false)

  // Check if user has already voted for this app
  const { hasVoted, isLoading: isStatusLoading } = useUserVoteStatus({
    appId,
    enabled: isConnected
  })

  // Hook to submit vote
  const { voteForApp, isLoading: isVoteLoading, error } = useVoteForApp({
    onSuccess: (data) => {
      setIsVoting(false)
      onVoteSuccess?.(data)
    },
    onError: (error) => {
      setIsVoting(false)
      onVoteError?.(error)
    }
  })

  console.log(error);

  const isLoading = isStatusLoading || isVoteLoading || isVoting

  // Handle vote submission
  const handleVote = async () => {
    if (!isConnected) {
      login()
      return
    }

    if (hasVoted || disabled) {
      return
    }

    setIsVoting(true)
    try {
      await voteForApp(appId)
    } catch (err) {
      setIsVoting(false)
      // Error handling is done in the hook
    }
  }

  // Determine button text and state
  const getButtonContent = () => {
    if (children) {
      return children
    }

    if (!isConnected) {
      return (
        <>
          Connect to Vote
          <AbstractLogo className="ml-2" />
        </>
      )
    }

    if (isLoading) {
      return (
        <>
          {isVoting ? "Voting..." : "Loading..."}
          <AbstractLogo className="ml-2 animate-spin" />
        </>
      )
    }

    if (hasVoted) {
      return (
        <>
          Voted
          <CheckIcon className="ml-2 h-4 w-4" />
        </>
      )
    }

    return (
      <>
        Upvote on Abstract
        <VoteIcon className="ml-2 h-4 w-4" />
      </>
    )
  }

  const isButtonDisabled = disabled || isLoading || (isConnected && hasVoted)

  return (
    <Button
      onClick={handleVote}
      disabled={isButtonDisabled}
      className={cn(
        "relative transition-all duration-200",
        hasVoted && "bg-green-600 hover:bg-green-700 text-white",
        className
      )}
    >
      {/* Reserve width for the longest default label to prevent layout shift */}
      <span className="invisible whitespace-nowrap">
        Upvote on Abstract <VoteIcon className="ml-1 h-4 w-4" />
      </span>
      {/* Center the active content over the reserved space */}
      <span className="absolute inset-0 flex items-center justify-center">
        {getButtonContent()}
      </span>
    </Button>
  )
}

function VoteIcon({ className }: { className?: ClassValue }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: ClassValue }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function AbstractLogo({ className }: { className?: ClassValue }) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 52 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path d="M33.7221 31.0658L43.997 41.3463L39.1759 46.17L28.901 35.8895C28.0201 35.0081 26.8589 34.5273 25.6095 34.5273C24.3602 34.5273 23.199 35.0081 22.3181 35.8895L12.0432 46.17L7.22205 41.3463L17.4969 31.0658H33.7141H33.7221Z" fill="currentColor" />
      <path d="M35.4359 28.101L49.4668 31.8591L51.2287 25.2645L37.1978 21.5065C35.9965 21.186 34.9954 20.4167 34.3708 19.335C33.7461 18.2613 33.586 17.0033 33.9063 15.8013L37.6623 1.76283L31.0713 0L27.3153 14.0385L35.4279 28.093L35.4359 28.101Z" fill="currentColor" />
      <path d="M15.7912 28.101L1.76028 31.8591L-0.00158691 25.2645L14.0293 21.5065C15.2306 21.186 16.2316 20.4167 16.8563 19.335C17.4809 18.2613 17.6411 17.0033 17.3208 15.8013L13.5648 1.76283L20.1558 0L23.9118 14.0385L15.7992 28.093L15.7912 28.101Z" fill="currentColor" />
    </svg>
  )
}