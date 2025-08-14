import { abstractTestnet } from "viem/chains";

export const chain =
  process.env.NODE_ENV === "development"
    ? abstractTestnet // Local development: Use Abstract Testnet
    : abstractTestnet; // Production: Use Abstract Testnet (change to mainnet when ready)
