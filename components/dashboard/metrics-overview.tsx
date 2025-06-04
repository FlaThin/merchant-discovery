import { Radio, PlayCircle, FileText, AlertTriangle } from "lucide-react"
import { MetricCard } from "../ui/metric-card"
import type { MetricCardData, CampaignMetrics } from "../../types/dashboard"

interface MetricsOverviewProps {
  campaignMetrics?: CampaignMetrics | null
  globalMetrics?: {
    totalAirings: number
    averageLivePercent: number
    scriptsProgress: { completed: number; total: number }
    stationsAtRisk: number
  }
}

export function MetricsOverview({ campaignMetrics, globalMetrics }: MetricsOverviewProps) {
  // Se há uma campanha selecionada, usar suas métricas, senão usar métricas globais
  const isGlobal = !campaignMetrics
  const metrics = campaignMetrics || globalMetrics

  if (!metrics) return null

  const metricsData: MetricCardData[] = [
    {
      title: isGlobal ? "Total Airings" : "Airings da Campanha",
      value: metrics.totalAirings,
      subtitle: isGlobal ? "+12% vs período anterior" : `Campanha: ${campaignMetrics?.campaignName}`,
      trend: isGlobal ? "+12%" : undefined,
      icon: Radio,
      variant: "primary",
    },
    {
      title: isGlobal ? "Live Coverage Médio" : "Live Coverage",
      value: `${isGlobal ? metrics.averageLivePercent : metrics.livePercent}%`,
      progress: isGlobal ? metrics.averageLivePercent : metrics.livePercent,
      icon: PlayCircle,
      variant:
        (isGlobal ? metrics.averageLivePercent : metrics.livePercent) >= 80
          ? "success"
          : (isGlobal ? metrics.averageLivePercent : metrics.livePercent) >= 60
            ? "warning"
            : "danger",
    },
    {
      title: "Scripts Progress",
      value: `${metrics.scriptsProgress.completed}/${metrics.scriptsProgress.total}`,
      progress: (metrics.scriptsProgress.completed / metrics.scriptsProgress.total) * 100,
      icon: FileText,
      variant: "warning",
    },
    {
      title: isGlobal ? "Estações em Risco" : "Scripts em Risco",
      value: isGlobal ? metrics.stationsAtRisk : (campaignMetrics?.scriptsAtRisk ?? 0),
      subtitle: isGlobal ? "Estações em risco" : "Scripts que precisam atenção",
      icon: AlertTriangle,
      variant: (isGlobal ? metrics.stationsAtRisk : (campaignMetrics?.scriptsAtRisk ?? 0)) > 0 ? "danger" : "success",
    },
  ]

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {isGlobal ? "Métricas Gerais" : `Métricas - ${campaignMetrics?.campaignName}`}
        </h2>
        <p className="text-sm text-gray-600">
          {isGlobal
            ? "Visão geral de todas as campanhas. Selecione uma campanha para ver métricas específicas."
            : "Métricas específicas da campanha selecionada"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <MetricCard key={index} data={metric} />
        ))}
      </div>
    </div>
  )
}
