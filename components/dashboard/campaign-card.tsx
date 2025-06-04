"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { StatusIndicator } from "../ui/status-indicator"
import { PerformanceBadge } from "../ui/performance-badge"
import { ChevronRight } from "lucide-react"
import type { Campaign } from "../../types/dashboard"
import { getCampaignVariantColors } from "../../utils/colorSystem"

interface CampaignCardProps {
  campaign: Campaign
  isSelected?: boolean
  onClick?: () => void
}

export function CampaignCard({ campaign, isSelected = false, onClick }: CampaignCardProps) {
  const scriptsProgress = (campaign.scripts.completed / campaign.scripts.total) * 100
  const variantColors = getCampaignVariantColors(campaign.performance)

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        isSelected && "ring-2 shadow-lg",
      )}
      style={{
        backgroundColor: isSelected ? variantColors.selectedBg : undefined,
        borderColor: isSelected ? variantColors.selectedBorder : undefined,
        ringColor: isSelected ? variantColors.selectedBorder : undefined,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Campanha ${campaign.name}. Clique para ver métricas e scripts detalhados.`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusIndicator status={campaign.status} />
            <CardTitle className="text-xl">{campaign.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <PerformanceBadge performance={campaign.performance} />
            <ChevronRight
              className={cn(
                "w-5 h-5 text-gray-400 transition-transform duration-200",
                isSelected && "rotate-90 text-gray-600",
              )}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{campaign.airings}</p>
            <p className="text-sm text-gray-600">Airings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{campaign.livePercent}%</p>
            <p className="text-sm text-gray-600">Live</p>
            <Progress value={campaign.livePercent} className="mt-1 h-2" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {campaign.scripts.completed}/{campaign.scripts.total}
            </p>
            <p className="text-sm text-gray-600">Scripts</p>
            <Progress value={scriptsProgress} className="mt-1 h-2" />
          </div>
        </div>

        {isSelected && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Métricas e scripts detalhados desta campanha são exibidos acima e abaixo
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
