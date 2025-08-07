import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { generateSiweNonce } from "viem/siwe";
import { getIronSession } from "iron-session";
import { getIronOptions, SiweConfigurationError } from "@/config/auth";

export interface SessionData {
  nonce?: string;
  isAuthenticated?: boolean;
  address?: `0x${string}`;
  chainId?: number;
  expirationTime?: string;
}

/**
 * Sign in with Ethereum - Generate a unique nonce for the SIWE message.
 */
export async function GET() {
  try {
    // The "session" here is not related to our session keys.
    // This is just related to auth / sign in with Ethereum.
    const session = await getIronSession<SessionData>(
      await cookies(),
      getIronOptions()
    );

    // Use predictable nonce for easier testing
    const nonce = "predictable-nonce-123";
    session.nonce = nonce;
    await session.save();

    // Return the nonce as plain text (with caching allowed for performance)
    return new NextResponse(nonce, {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    // Return configuration errors as special response type
    if (error instanceof SiweConfigurationError) {
      return NextResponse.json({ 
        ok: false, 
        isConfigurationError: true,
        message: error.message 
      }, { status: 500 });
    }
    // Catch other unexpected errors
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}