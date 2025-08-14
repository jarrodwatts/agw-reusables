"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/registry/new-york/ui/card"
import { Badge } from "@/registry/new-york/ui/badge"
import { Skeleton } from "@/registry/new-york/ui/skeleton"
import { AspectRatio } from "@/registry/new-york/ui/aspect-ratio"
import { useNFTs } from "./hooks/use-nfts"
import type { NFT, NFTGalleryProps } from "./lib/types"
import { AlertCircle, ImageIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/registry/new-york/ui/alert"

function NFTCard({
  nft,
  showCollectionName = true,
  showFloorPrice = false
}: {
  nft: NFT
  showCollectionName?: boolean
  showFloorPrice?: boolean
}) {
  const imageUrl = nft.media?.imageUrl?.medium || nft.media?.imageUrl?.large || nft.imageUrl
  const hasImage = !!imageUrl
  const collectionName = nft.collection?.name || nft.contract?.name
  const floorPrice = nft.floorAsk?.price?.amount?.usd || nft.collection?.floorAskPrice?.amount?.usd

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md p-0 gap-1">
      <div className="relative">
        <AspectRatio ratio={1} className="bg-muted overflow-hidden">
          {hasImage ? (
            <img
              src={imageUrl}
              alt={nft.name || "NFT"}
              className="object-cover absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const fallback = target.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = "flex"
              }}
            />
          ) : null}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-muted",
              hasImage && "hidden"
            )}
          >
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        </AspectRatio>

        {nft.balance && parseInt(nft.balance) > 1 && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 text-xs"
          >
            ×{nft.balance}
          </Badge>
        )}
      </div>

      <div className="p-2">
        <h3 className="font-medium text-sm truncate" title={nft.name}>
          {nft.name || `#${nft.tokenId}`}
        </h3>

        {showCollectionName && collectionName && (
          <p className="text-xs text-muted-foreground truncate mt-1" title={collectionName}>
            {collectionName}
          </p>
        )}

        {showFloorPrice && floorPrice && (
          <p className="text-xs font-medium text-green-600 mt-1">
            ${floorPrice.toFixed(2)}
          </p>
        )}
      </div>
    </Card>
  )
}


/**
 * NFT Gallery - A responsive gallery component that displays a user's NFTs
 * 
 * Fetches and displays NFTs from the Abstract backend API in a responsive grid layout
 * with support for loading states, error handling, and customizable display options.
 */
export function NFTGallery({
  address,
  className,
  columns = { default: 2, sm: 3, md: 4, lg: 6 },
  showCollectionName = true,
  showFloorPrice = false,
  maxItems,
}: NFTGalleryProps) {
  const { data, isLoading, error } = useNFTs(address)

  const filteredNfts = data?.nfts?.filter(nft =>
    !nft.collection?.name?.toLowerCase().includes('abscash')
  ) || []

  const nfts = maxItems
    ? filteredNfts.slice(0, maxItems)
    : filteredNfts

  // Use CSS variables + arbitrary properties to control columns at runtime without relying on dynamic Tailwind class names.
  // The class below defines grid-template-columns from --cols and updates it at breakpoints.
  const gridColsClass =
    "[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] sm:[--cols:var(--cols-sm)] md:[--cols:var(--cols-md)] lg:[--cols:var(--cols-lg)]"

  const gridStyle = {
    // Base columns and breakpoint overrides via CSS vars
    "--cols": String(columns.default ?? 2),
    "--cols-sm": String(columns.sm ?? columns.default ?? 2),
    "--cols-md": String(columns.md ?? columns.sm ?? columns.default ?? 2),
    "--cols-lg": String(columns.lg ?? columns.md ?? columns.sm ?? columns.default ?? 2),
  } as React.CSSProperties & Record<string, string>

  if (isLoading) {
    return (
      <div
        className={cn("grid w-full min-w-0 flex-1 gap-4", gridColsClass, className)}
        style={gridStyle}
      >
        {Array.from({ length: maxItems || 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden p-0">
            <div className="relative">
              <AspectRatio ratio={1} className="bg-muted">
                <Skeleton className="h-full w-full" />
              </AspectRatio>
            </div>
            <div className="p-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2 mt-1" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={className}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load NFTs. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!nfts.length) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="text-center py-8">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No NFTs found</h3>
          <p className="text-muted-foreground">
            This wallet doesn't have any NFTs yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div
      className={cn("grid w-full min-w-0 flex-1 gap-4", gridColsClass, className)}
      style={gridStyle}
    >
      {nfts.map((nft) => (
        <NFTCard
          key={nft.id}
          nft={nft}
          showCollectionName={showCollectionName}
          showFloorPrice={showFloorPrice}
        />
      ))}
    </div>
  )
}