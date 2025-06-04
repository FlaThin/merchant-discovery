"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, FileText, BarChart3 } from "lucide-react"
import { MerchantScriptItem } from "./merchant-script-item"
import type { Campaign, MerchantScript } from "../../types/dashboard"

interface CampaignScriptsSectionProps {
  campaign: Campaign
  scripts: MerchantScript[]
  onClose: () => void
}

export function CampaignScriptsSection({ campaign, scripts, onClose }: CampaignScriptsSectionProps) {
  const totalAirings = scripts.reduce((sum, script) => sum + script.airings, 0)
  const averageLivePercent =
    scripts.length > 0 ? Math.round(scripts.reduce((sum, script) => sum + script.livePercent, 0) / scripts.length) : 0
  const completedScripts = scripts.filter((script) => script.status === "completed").length
  const averageCoverage =
    scripts.length > 0 ? Math.round(scripts.reduce((sum, script) => sum + script.coverage, 0) / scripts.length) : 0

  return (
    <div className="space-y-6">
      {/* Header da seção */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <div>
                <CardTitle className="text-xl text-blue-900">Scripts da Campanha: {campaign.name}</CardTitle>
                <p className="text-sm text-blue-700 mt-1">Análise detalhada dos scripts e sua performance</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Estatísticas dos scripts da campanha */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{scripts.length}</p>
            <p className="text-sm text-gray-600">Total Scripts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{completedScripts}</p>
            <p className="text-sm text-gray-600">Concluídos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{totalAirings}</p>
            <p className="text-sm text-gray-600">Airings dos Scripts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{averageCoverage}%</p>
            <p className="text-sm text-gray-600">Coverage Médio</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de scripts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Scripts Detalhados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scripts.length > 0 ? (
              scripts.map((script) => <MerchantScriptItem key={script.id} script={script} />)
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum script encontrado</h3>
                <p className="text-gray-600">Esta campanha ainda não possui scripts cadastrados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
