export interface NFTAttribute {
  trait_type: string
  value: string | number
}

export interface NFTContract {
  address: string
  name: string
  symbol: string
  type: "ERC721" | "ERC1155"
  openSeaSlug?: string
  description?: string
  imageUrl?: string
  externalUrl?: string
}

export interface NFTCollection {
  id: string
  name: string
  description?: string
  imageUrl?: string
  floorAskPrice?: {
    amount: {
      decimal: number
      usd: number
    }
    currency: {
      contract: string
      name: string
      symbol: string
      decimals: number
    }
  }
}

export interface NFTMedia {
  small?: string
  medium?: string
  large?: string
}

export interface NFTLastSale {
  orderSource: string
  fillSource?: string
  timestamp: number
  price?: {
    amount: {
      decimal: number
      usd: number
    }
    currency: {
      contract: string
      name: string
      symbol: string
      decimals: number
    }
  }
}

export interface NFT {
  id: string
  chain: string
  kind: string
  contract: NFTContract
  tokenId: string
  name: string
  description?: string
  imageUrl?: string
  imageOriginalUrl?: string
  animationOriginalUrl?: string
  metadataOriginalUrl?: string
  media?: {
    imageUrl?: NFTMedia
    videoUrl?: string
    audioUrl?: string
    modelUrl?: string
  }
  attributes?: NFTAttribute[]
  balance: string
  acquiredAt?: string
  collection: NFTCollection
  lastSale?: NFTLastSale
  floorAsk?: {
    price?: {
      amount: {
        decimal: number
        usd: number
      }
      currency: {
        contract: string
        name: string
        symbol: string
        decimals: number
      }
    }
  }
}

export interface NFTGalleryResponse {
  nfts: NFT[]
}

export interface NFTGalleryProps {
  address: string
  className?: string
  columns?: {
    default: number
    sm: number
    md: number
    lg: number
  }
  showCollectionName?: boolean
  showFloorPrice?: boolean
  maxItems?: number
}