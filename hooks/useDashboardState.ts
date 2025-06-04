"use client"

import { useState } from "react"

export function useDashboardState() {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)

  const selectCampaign = (campaignId: string) => {
    setSelectedCampaignId(selectedCampaignId === campaignId ? null : campaignId)
  }

  const clearSelection = () => {
    setSelectedCampaignId(null)
  }

  return {
    selectedCampaignId,
    selectCampaign,
    clearSelection,
  }
}
