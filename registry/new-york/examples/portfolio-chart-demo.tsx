"use client"

import { PortfolioChart } from "@/registry/new-york/blocks/portfolio-chart/portfolio-chart"
import { useAccount } from "wagmi"

export default function PortfolioChartDemo() {
  const { address: connectedAddress } = useAccount()
  const defaultAddress = "0x1c67724acc76821c8ad1f1f87ba2751631babd0c"
  const address = connectedAddress || defaultAddress

  return (
    <PortfolioChart
      address={address}
      defaultPeriod="30d"
    />
  )
}