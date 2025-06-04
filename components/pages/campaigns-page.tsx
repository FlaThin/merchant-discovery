"use client"

import { useState } from "react"
import { CampaignForm } from "../campaigns/campaign-form"
import { CampaignsList } from "../campaigns/campaigns-list"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import type { Campaign, NewCampaign } from "../../types/dashboard"

interface CampaignsPageProps {
  campaigns: Campaign[]
  onAddCampaign: (campaign: NewCampaign) => Campaign
}

export function CampaignsPage({ campaigns, onAddCampaign }: CampaignsPageProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastCreatedCampaign, setLastCreatedCampaign] = useState<string>("")

  const handleAddCampaign = (newCampaign: NewCampaign) => {
    const campaign = onAddCampaign(newCampaign)
    setLastCreatedCampaign(campaign.name)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Campanhas</h1>
        <p className="text-gray-600">Crie e gerencie suas campanhas publicitárias</p>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Campanha "{lastCreatedCampaign}" criada com sucesso!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
          <CampaignForm onSubmit={handleAddCampaign} />
        </div>
        <div>
          <CampaignsList campaigns={campaigns} />
        </div>
      </div>
    </div>
  )
}
