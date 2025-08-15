"use client";

import { useEffect } from "react";
import {
  OnboardingProvider,
  useOnboardingContext,
} from "@/registry/new-york/blocks/onboarding-dialog/lib/onboarding-context";
import { useRegisterOnboarding } from "@/registry/new-york/blocks/onboarding-dialog/lib/require-onboarding";
import { OnboardingDialog } from "@/registry/new-york/blocks/onboarding-dialog/onboarding-dialog";

function OnboarderInner() {
  const { currentRequest, isOpen, _handleComplete, _handleClose, _isReady } =
    useOnboardingContext();

  // Register the global requireOnboarding function
  useRegisterOnboarding();

  // Auto-complete if steps become ready while dialog is open
  useEffect(() => {
    if (currentRequest && isOpen && _isReady(currentRequest.steps)) {
      // Small delay to show completion state
      const timer = setTimeout(() => {
        _handleComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentRequest, isOpen, _isReady, _handleComplete]);

  // Don't render anything if no active request
  if (!currentRequest) {
    return null;
  }

  return (
    <OnboardingDialog
      steps={currentRequest.steps}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          _handleClose();
        }
      }}
      onComplete={_handleComplete}
    />
  );
}

/**
 * Onboarder Component
 *
 * Similar to Sonner's <Toaster />, this component should be placed once at your app root.
 * It renders onboarding dialogs when requireOnboarding() is called anywhere in your app.
 *
 * Usage:
 * ```tsx
 * // In your app root (layout.tsx or _app.tsx)
 * import { Onboarder } from "@/components/onboarder"
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Onboarder />
 *       </body>
 *     </html>
 *   )
 * }
 *
 * // Anywhere in your app
 * import { requireOnboarding } from "@/lib/require-onboarding"
 *
 * function MyComponent() {
 *   const handleAction = () => {
 *     requireOnboarding(
 *       { connectWallet: true, signWithEthereum: true },
 *       () => console.log("Action executed!")
 *     )
 *   }
 * }
 * ```
 */
export function Onboarder() {
  return (
    <OnboardingProvider>
      <OnboarderInner />
    </OnboardingProvider>
  );
}
