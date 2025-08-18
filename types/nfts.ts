export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface NFTContract {
  address: string;
  name: string;
  symbol: string;
  type: "ERC721" | "ERC1155";
  openSeaSlug?: string;
  description?: string;
  imageUrl?: string;
  externalUrl?: string;
}

export interface NFTCollection {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  floorAskPrice?: {
    amount: {
      decimal: number;
      usd: number;
    };
    currency: {
      contract: string;
      name: string;
      symbol: string;
      decimals: number;
    };
  };
}

export interface NFTMedia {
  small?: string;
  medium?: string;
  large?: string;
}

export interface NFTLastSale {
  orderSource: string;
  fillSource?: string;
  timestamp: number;
  price?: {
    amount: {
      decimal: number;
      usd: number;
    };
    currency: {
      contract: string;
      name: string;
      symbol: string;
      decimals: number;
    };
  };
}

export interface NFT {
  id: string;
  chain: string;
  contract: {
    type: "ERC721" | "ERC1155";
    name: string;
    symbol: string;
  };
  contractAddress: string;
  symbol: string;
  tokenId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  imageSmallUrl?: string;
  imageMediumUrl?: string;
  imageLargeUrl?: string;
  videoUrl?: string | null;
  videoThumbnailUrl?: string | null;
  audioUrl?: string | null;
  modelUrl?: string | null;
  otherUrl?: string | null;
  externalUrl?: string | null;
  metadata?: {
    attributes: NFTAttribute[];
    imageOriginalUrl?: string | null;
    animationOriginalUrl?: string | null;
  };
  metadataUrl?: string;
  collection: {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    externalUrl?: string | null;
    twitterUsername?: string | null;
    discordUrl?: string | null;
    instagramUsername?: string | null;
    isNSFW: boolean;
  };
  lastSale?: {
    currency: {
      contract: string;
      name: string;
      symbol: string;
      decimals: number;
    };
    amount: {
      raw: string;
      decimal: number;
      usd: number;
      native: number;
    };
  } | null;
  floorAsk?: {
    currency: {
      contract: string;
      name: string;
      symbol: string;
      decimals: number;
    };
    amount: {
      raw: string;
      decimal: number;
      usd: number;
      native: number;
    };
  };
  balance: string;
  isPinned: boolean;
  isHidden: boolean;
}


