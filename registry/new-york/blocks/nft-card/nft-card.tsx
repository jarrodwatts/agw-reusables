"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import { AspectRatio } from "@/registry/new-york/ui/aspect-ratio";
import type { NFT } from "@/types/nfts";

interface NFTCardProps {
  nft: NFT;
  showCollectionName?: boolean;
  className?: string;
}

/**
 * NFT Card - A single NFT card component that displays an NFT with image, name, collection, and balance
 */
export function NFTCard({
  nft,
  showCollectionName = true,
  className,
}: NFTCardProps) {
  const imageUrl = nft.imageMediumUrl || nft.imageLargeUrl || nft.imageUrl;
  const hasImage = !!imageUrl;
  const collectionName = nft.collection?.name || nft.contract?.name;

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-shadow hover:shadow-md p-0 gap-1",
        className
      )}
    >
      <div className="relative">
        <AspectRatio ratio={1} className="bg-muted overflow-hidden">
          {hasImage ? (
            <img
              src={imageUrl}
              alt={nft.name || "NFT"}
              className="object-cover absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground",
              hasImage && "hidden"
            )}
          >
            No Image
          </div>
        </AspectRatio>

        {nft.balance && parseInt(nft.balance) > 1 && (
          <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
            ×{nft.balance}
          </Badge>
        )}
      </div>

      <div className="p-2">
        <h3 className="font-medium text-sm truncate" title={nft.name}>
          {nft.name || `#${nft.tokenId}`}
        </h3>

        {showCollectionName && collectionName && (
          <p
            className="text-xs text-muted-foreground truncate mt-1"
            title={collectionName}
          >
            {collectionName}
          </p>
        )}
      </div>
    </Card>
  );
}
