"use client";

import { NFTCard } from "@/registry/new-york/blocks/nft-card/nft-card";
import { useNFTs } from "@/registry/new-york/blocks/nft-card/hooks/use-nfts";
import { useAccount } from "wagmi";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { Card } from "@/registry/new-york/ui/card";
import { AspectRatio } from "@/registry/new-york/ui/aspect-ratio";

export default function NFTCardDemo() {
  const { address: connectedAddress } = useAccount();
  const defaultAddress = "0x06639F064b82595F3BE7621F607F8e8726852fCf";
  const address = connectedAddress || defaultAddress;

  const { data, isLoading, error } = useNFTs(address);

  const filteredNfts =
    data?.nfts?.filter(
      (nft) => !nft.collection?.name?.toLowerCase().includes("abscash")
    ) || [];

  const nfts = filteredNfts.slice(0, 3); // Show only 3 NFTs

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 w-full">
        {Array.from({ length: 3 }).map((_, i) => (
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
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Failed to load NFTs
      </div>
    );
  }

  if (!nfts.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No NFTs found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} showCollectionName={true} />
      ))}
    </div>
  );
}
