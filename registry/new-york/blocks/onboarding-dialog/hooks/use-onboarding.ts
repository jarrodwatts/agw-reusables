"use client";

import { useCallback, useMemo } from "react";
import { useAccount } from "wagmi";
import { useSiweAuthQuery } from "@/registry/new-york/blocks/siwe-button/hooks/use-siwe-auth-query";
import { useSessionKey } from "@/registry/new-york/blocks/session-keys/hooks/use-session-key";
import { requireOnboarding } from "../lib/require-onboarding";

interface OnboardingSteps {
  connectWallet?: boolean;
  signWithEthereum?: boolean;
  createSessionKey?: boolean;
}

interface UseOnboardingReturn {
  ready: boolean;
  require: () => boolean;
  showDialog: () => void;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
}

/**
 * Hook for managing onboarding requirements and gating functionality
 *
 * @param steps Configuration for required onboarding steps
 * @returns Object with ready state, loading/error states, and control functions
 * @returns ready - Whether all required onboarding steps are completed
 * @returns isLoading - Whether we're loading data needed to determine onboarding state
 * @returns isError - Whether any authentication queries have errors
 * @returns error - The first error encountered, if any
 * @returns require - Function to gate actions behind onboarding completion
 * @returns showDialog - Function to manually show the onboarding dialog
 *
 * @example
 * ```tsx
 * const { ready, isLoading, isError, error, require } = useOnboarding({
 *   connectWallet: true,
 *   signWithEthereum: true,
 *   createSessionKey: false
 * })
 *
 * // Show loading state while determining onboarding status
 * if (isLoading) {
 *   return <div>Loading...</div>
 * }
 *
 * // Show error state if authentication fails
 * if (isError) {
 *   return <div>Error: {error?.message}</div>
 * }
 *
 * const handleClick = () => {
 *   if (!require()) return // Shows dialog if not ready
 *   doProtectedAction() // Only runs if onboarded
 * }
 * ```
 */
export function useOnboarding(steps: OnboardingSteps): UseOnboardingReturn {
  // Get current authentication state
  const { isConnected, isConnecting, isReconnecting } = useAccount();
  const authQuery = useSiweAuthQuery();
  const sessionQuery = useSessionKey();

  const { data: authData } = authQuery;
  const { data: sessionData } = sessionQuery;

  // Check authentication and session status
  const isAuthenticated = !!(authData?.ok && authData?.user?.isAuthenticated);
  const hasActiveSession = !!sessionData;

  // Show loading while we don't have enough data to determine the user's onboarding state
  // Treat required steps with unknown state (no data and no error) as loading, but only once wallet is connected
  const requireConnect = !!steps.connectWallet;
  const requireAuth = !!steps.signWithEthereum;
  const requireSession = !!steps.createSessionKey;

  // Only consider auth/session loading once a wallet is connected
  const missingAuthState =
    requireAuth &&
    isConnected &&
    typeof authQuery.data === "undefined" &&
    !authQuery.error;
  const missingSessionState =
    requireSession &&
    isConnected &&
    typeof sessionQuery.data === "undefined" &&
    !sessionQuery.error;

  // If connectWallet is required and we are not connected, don't block on loading unless we are actively connecting/reconnecting
  const isLoading = !!(
    isConnecting ||
    isReconnecting ||
    (!isConnected && requireConnect
      ? false
      : missingAuthState || missingSessionState)
  );

  // Debug logging
  console.log("🔍 useOnboarding Debug:", {
    isConnected,
    isConnecting,
    isReconnecting,
    "authQuery.isLoading": authQuery.isLoading,
    "authQuery.data": !!authQuery.data,
    "authQuery.error": !!authQuery.error,
    "sessionQuery.isLoading": sessionQuery.isLoading,
    "sessionQuery.data": !!sessionQuery.data,
    "sessionQuery.error": !!sessionQuery.error,
    isLoading,
  });

  // Aggregate error states
  const isError = useMemo(() => {
    return !!(authQuery.error || sessionQuery.error);
  }, [authQuery.error, sessionQuery.error]);

  // Get first error encountered for debugging
  const error = useMemo<Error | undefined>(() => {
    return authQuery.error || sessionQuery.error || undefined;
  }, [authQuery.error, sessionQuery.error]);

  // Check if all required steps are completed
  const ready = useMemo(() => {
    const stepStates = {
      connectWallet: isConnected,
      signWithEthereum: isConnected && isAuthenticated,
      createSessionKey: isConnected && hasActiveSession,
    };

    return Object.entries(steps).every(([stepKey, required]) => {
      if (!required) return true;
      return stepStates[stepKey as keyof typeof stepStates];
    });
  }, [steps, isConnected, isAuthenticated, hasActiveSession]);

  // Function to gate actions behind onboarding completion
  const require = useCallback((): boolean => {
    if (ready) {
      // All required steps completed
      return true;
    } else {
      // Missing required steps, show the onboarding modal using existing global function
      requireOnboarding(steps, () => {
        // This will be called when onboarding completes, but we don't need to do anything
        // since the user's action will be in their own code after the require() call
      });
      return false;
    }
  }, [ready, steps]);

  // Function to manually show the dialog
  const showDialog = useCallback(() => {
    requireOnboarding(steps, () => {
      // Manual dialog show, no action needed on completion
    });
  }, [steps]);

  // Final debug log before return
  console.log("🔍 Final return values:", { ready, isLoading, isError });

  return {
    ready,
    require,
    showDialog,
    isLoading,
    isError,
    error,
  };
}
