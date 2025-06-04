"use client"

import type { Campaign } from "../../types/dashboard"
import { CampaignCard } from "./campaign-card"

interface CampaignsSectionProps {
  campaigns: Campaign[]
  selectedCampaignId: string | null
  onCampaignSelect: (campaignId: string) => void
}

export function CampaignsSection({ campaigns, selectedCampaignId, onCampaignSelect }: CampaignsSectionProps) {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Campanhas</h2>
        <p className="text-sm text-gray-600">
          Clique em uma campanha para visualizar suas métricas específicas e scripts detalhados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            isSelected={selectedCampaignId === campaign.id}
            onClick={() => onCampaignSelect(campaign.id)}
          />
        ))}
      </div>
    </div>
  )
}
