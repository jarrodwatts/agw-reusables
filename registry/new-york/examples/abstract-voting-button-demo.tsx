"use client"

import { AbstractVotingButton } from "@/registry/new-york/blocks/abstract-voting-button/abstract-voting-button"
import { AbstractWalletProvider } from "@abstract-foundation/agw-react"
import { abstract } from "viem/chains"

const onchainHeroesData = {
  id: "25",
  name: "Onchain Heroes",
  description: "The idle RPG for degens. Onchain Heroes is an idle RPG with a focus on onchain financial mechanics. Low time requirement, high thought requirement. The entire game—moves, items, and progress—exists on the blockchain, ensuring that it is verifiable by anyone.",
  icon: "https://abstract-portal-metadata-prod.s3.amazonaws.com/76c5ffe6-124f-43e7-97cf-f85a36f1bb4f.png",
  banner: "https://abstract-portal-metadata-prod.s3.amazonaws.com/c6497be9-5786-4f0e-a0e2-c4302a2fcd0f.png",
  votes: 2578,
  link: "https://play.onchainheroes.xyz/",
  spotlight: "global",
  category: "Gaming",
  twitter: "https://x.com/onchainheroes"
}

function VotingCardDemo() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Card container with blurred background */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
        
        {/* Blurred background image */}
        <div className="absolute inset-0">
          <img 
            src={onchainHeroesData.banner} 
            alt={`${onchainHeroesData.name} background`}
            className="w-full h-full object-cover scale-110 blur-lg opacity-40"
          />
          {/* Theme-aware overlay for better contrast */}
          <div className="absolute inset-0 bg-white/80 dark:bg-black/60" />
        </div>

        {/* Main banner section */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={onchainHeroesData.banner} 
            alt={`${onchainHeroesData.name} banner`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </div>

        {/* App icon, name, and vote button section */}
        <div className="relative p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Top row: App icon and name */}
            <div className="flex items-center gap-4 flex-1">
              {/* App icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-3 border-gray-200/50 dark:border-white/20 shadow-xl overflow-hidden bg-white/30 dark:bg-white/10 backdrop-blur-sm">
                <img 
                  src={onchainHeroesData.icon} 
                  alt={`${onchainHeroesData.name} icon`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* App name */}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white drop-shadow-lg">
                  {onchainHeroesData.name}
                </h3>
              </div>
              
              {/* Vote button - hidden on mobile, shown on desktop */}
              <div className="hidden sm:block">
                <AbstractVotingButton 
                  appId={onchainHeroesData.id}
                  className="text-sm whitespace-nowrap min-w-[140px]"
                />
              </div>
            </div>
            
            {/* Bottom row: Vote button on mobile */}
            <div className="block sm:hidden">
              <AbstractVotingButton 
                appId={onchainHeroesData.id}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AbstractVotingButtonDemo() {
  return (
    // Voting only works on Abstract Mainnet (not testnet)
    // So we wrap it in a mainnet provider below.
    <AbstractWalletProvider chain={abstract}>
      <VotingCardDemo />
    </AbstractWalletProvider>
  )
}