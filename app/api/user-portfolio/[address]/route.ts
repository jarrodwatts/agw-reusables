import { NextRequest, NextResponse } from "next/server";

const ABSTRACT_PORTAL_API_URL = "https://backend.portal.abs.xyz/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;

    // Validate the address parameter
    if (!address) {
      return NextResponse.json(
        { error: "Address parameter is required" },
        { status: 400 }
      );
    }

    // Fetch portfolio data from Abstract Portal API
    const response = await fetch(
      `${ABSTRACT_PORTAL_API_URL}/user/${address}/portfolio/value`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "agw-reusables/1.0",
        },
        // Add cache control
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    // Handle non-200 responses
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Portfolio data not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch portfolio data" },
        { status: response.status }
      );
    }

    const portfolioData = await response.json();

    // Return the portfolio data with appropriate headers
    return NextResponse.json(portfolioData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}