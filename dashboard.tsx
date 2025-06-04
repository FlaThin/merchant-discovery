"use client"

import { Sidebar } from "./components/navigation/sidebar"
import { DashboardHeader } from "./components/dashboard/dashboard-header"
import { RiskAlert } from "./components/dashboard/risk-alert"
import { MetricsOverview } from "./components/dashboard/metrics-overview"
import { CampaignsSection } from "./components/dashboard/campaigns-section"
import { CampaignScriptsSection } from "./components/dashboard/campaign-scripts-section"
import { CampaignsPage } from "./components/pages/campaigns-page"
import { ValidationPage } from "./components/pages/validation-page"
import { useDashboardData } from "./hooks/useDashboardData"
import { useDashboardState } from "./hooks/useDashboardState"
import { useNavigation } from "./hooks/useNavigation"
import { cn } from "@/lib/utils"

export default function ImprovedDashboard() {
  const {
    campaigns,
    globalMetrics,
    dateRange,
    setDateRange,
    getScriptsByCampaign,
    getCampaignById,
    getCampaignMetrics,
    getScriptsNeedingValidation,
    addCampaign,
    validateScriptResult,
  } = useDashboardData()

  const { selectedCampaignId, selectCampaign, clearSelection } = useDashboardState()
  const { currentPage, isMenuOpen, navigateTo, toggleMenu } = useNavigation()

  const selectedCampaign = selectedCampaignId ? getCampaignById(selectedCampaignId) : null
  const campaignMetrics = selectedCampaignId ? getCampaignMetrics(selectedCampaignId) : null
  const campaignScripts = selectedCampaignId ? getScriptsByCampaign(selectedCampaignId) : []
  const scriptsNeedingValidation = getScriptsNeedingValidation()

  // Determinar qual alerta de risco mostrar
  const riskCount = campaignMetrics ? campaignMetrics.scriptsAtRisk : globalMetrics.stationsAtRisk
  const isGlobalRisk = !campaignMetrics

  const renderPage = () => {
    switch (currentPage) {
      case "campaigns":
        return <CampaignsPage campaigns={campaigns} onAddCampaign={addCampaign} />
      case "validation":
        return <ValidationPage scriptsNeedingValidation={scriptsNeedingValidation} onValidate={validateScriptResult} />
      case "dashboard":
      default:
        return (
          <div className="space-y-8">
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
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentPage={currentPage}
        isOpen={isMenuOpen}
        onNavigate={navigateTo}
        onToggle={toggleMenu}
        scriptsNeedingValidation={scriptsNeedingValidation.length}
      />

      <div className={cn("flex-1 min-w-0")}>
        <main className="p-6">{renderPage()}</main>
      </div>
    </div>
  )
}
