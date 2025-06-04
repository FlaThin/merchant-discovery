"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RiskAlert } from "@/components/dashboard/risk-alert"
import { MetricsOverview } from "@/components/dashboard/metrics-overview"
import { CampaignsSection } from "@/components/dashboard/campaigns-section"
import { CampaignScriptsSection } from "@/components/dashboard/campaign-scripts-section"
import { useDashboardData } from "@/hooks/useDashboardData"
import { useDashboardState } from "@/hooks/useDashboardState"
import { cn } from "@/lib/utils"

export default function DashboardOverviewPage() {
  const {
    campaigns,
    globalMetrics,
    dateRange,
    setDateRange,
    getScriptsByCampaign,
    getCampaignById,
    getCampaignMetrics,
  } = useDashboardData()

  const { selectedCampaignId, selectCampaign, clearSelection } = useDashboardState()

  const selectedCampaign = selectedCampaignId ? getCampaignById(selectedCampaignId) : null
  const campaignMetrics = selectedCampaignId ? getCampaignMetrics(selectedCampaignId) : null
  const campaignScripts = selectedCampaignId ? getScriptsByCampaign(selectedCampaignId) : []

  // Determinar qual alerta de risco mostrar
  const riskCount = campaignMetrics ? campaignMetrics.scriptsAtRisk : globalMetrics.stationsAtRisk
  const isGlobalRisk = !campaignMetrics

  return (
    <main className="p-6 space-y-8">
      <DashboardHeader
        title="Campaign Dashboard"
        breadcrumb={["Advertisers", "Natubio"]}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <RiskAlert riskCount={riskCount} isGlobal={isGlobalRisk} campaignName={campaignMetrics?.campaignName} />

      <MetricsOverview campaignMetrics={campaignMetrics} globalMetrics={globalMetrics} />

      <CampaignsSection
        campaigns={campaigns}
        selectedCampaignId={selectedCampaignId}
        onCampaignSelect={selectCampaign}
      />

      {selectedCampaign && (
        <CampaignScriptsSection campaign={selectedCampaign} scripts={campaignScripts} onClose={clearSelection} />
      )}
    </main>
  )
}
