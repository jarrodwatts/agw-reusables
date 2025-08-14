import { ABSTRACT_VOTING_ADDRESS, ABSTRACT_VOTING_ABI } from "./voting-contract"

/**
 * Custom error class for Abstract voting configuration issues.
 * These errors should bubble up to show helpful messages to developers.
 */
export class VotingConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VotingConfigurationError";
  }
}

/**
 * Check if a user has voted for a specific app in the current epoch
 */
export function hasUserVotedForApp(userVotes: bigint[], appId: bigint): boolean {
  return userVotes.some(vote => vote === appId)
}

/**
 * Format app ID to ensure it's a valid bigint
 */
export function formatAppId(appId: string | number | bigint): bigint {
  return BigInt(appId)
}

/**
 * Validate that an app ID is a positive number
 */
export function isValidAppId(appId: string | number | bigint): boolean {
  try {
    const id = BigInt(appId)
    return id > BigInt(0)
  } catch {
    return false
  }
}

export { ABSTRACT_VOTING_ADDRESS, ABSTRACT_VOTING_ABI }