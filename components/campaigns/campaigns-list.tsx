"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatusIndicator } from "../ui/status-indicator"
import { PerformanceBadge } from "../ui/performance-badge"
import { Calendar, Tag } from "lucide-react"
import type { Campaign } from "../../types/dashboard"

interface CampaignsListProps {
  campaigns: Campaign[]
}

export function CampaignsList({ campaigns }: CampaignsListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Campanhas Existentes ({campaigns.length})</h3>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusIndicator status={campaign.status} />
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                </div>
                <PerformanceBadge performance={campaign.performance} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Keywords */}
                <div>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Palavras-chave:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {campaign.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Airings</p>
                    <p className="font-semibold">{campaign.airings}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Live %</p>
                    <p className="font-semibold">{campaign.livePercent}%</p>
                  </div>
                </div>

                {/* Created date */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  Criada em {campaign.createdAt.toLocaleDateString("pt-BR")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
