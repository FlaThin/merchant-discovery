"use client"

import { CampaignsPage } from "@/components/pages/campaigns-page"
import { useDashboardData } from "@/hooks/useDashboardData"

export default function CampaignsRoutePage() {
  const { campaigns, addCampaign } = useDashboardData()
  return <main className="p-6"><CampaignsPage campaigns={campaigns} onAddCampaign={addCampaign} /></main>
} 