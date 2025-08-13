import { useQuery } from "@tanstack/react-query"
import type { NFTGalleryResponse } from "../lib/types"

async function fetchUserNFTs(address: string): Promise<NFTGalleryResponse> {
    if (!address) {
        throw new Error("Address is required")
    }

    const response = await fetch(
        `https://backend.portal.abs.xyz/api/user/${address}/wallet/v2/nfts`
    )

    if (!response.ok) {
        throw new Error(`Failed to fetch NFTs: ${response.statusText}`)
    }

    return response.json()
}

export function useNFTs(address: string, enabled = true) {
    return useQuery({
        queryKey: ["nfts", address],
        queryFn: () => fetchUserNFTs(address),
        enabled: enabled && !!address,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
}


