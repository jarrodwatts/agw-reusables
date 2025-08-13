"use client"

import { NFTGallery } from "@/registry/new-york/blocks/nft-gallery/nft-gallery"
import { useAccount } from "wagmi"

export default function NFTGalleryDemo() {
  const { address: connectedAddress } = useAccount()
  const defaultAddress = "0x06639F064b82595F3BE7621F607F8e8726852fCf"
  const address = connectedAddress || defaultAddress

  return (
    <NFTGallery
      address={address}
      maxItems={3}
      columns={{ default: 3, sm: 3, md: 3, lg: 3 }}
      showCollectionName={true}
      showFloorPrice={false}
    />
  )
}