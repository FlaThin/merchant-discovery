"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, BarChart3 } from "lucide-react"
import { CampaignsSection } from "./campaigns-section"
import { MerchantScriptsSection } from "./merchant-scripts-section"
import type { Campaign, MerchantScript } from "../../types/dashboard"

interface ContentSectionProps {
  title: string
  description: string
  campaigns: Campaign[]
  scripts: MerchantScript[]
  onClose: () => void
}

export function ContentSection({ title, description, campaigns, scripts, onClose }: ContentSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header da seção */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <div>
                <CardTitle className="text-xl text-blue-900">{title}</CardTitle>
                <p className="text-sm text-blue-700 mt-1">{description}</p>
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

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
            <p className="text-sm text-gray-600">Campanhas Filtradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{scripts.length}</p>
            <p className="text-sm text-gray-600">Scripts Relacionados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{campaigns.reduce((sum, c) => sum + c.airings, 0)}</p>
            <p className="text-sm text-gray-600">Total de Airings</p>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo das campanhas */}
      {campaigns.length > 0 && <CampaignsSection campaigns={campaigns} />}

      {/* Conteúdo dos scripts */}
      {scripts.length > 0 && <MerchantScriptsSection scripts={scripts} />}

      {/* Estado vazio */}
      {campaigns.length === 0 && scripts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum dado encontrado</h3>
            <p className="text-gray-600">Não há campanhas ou scripts que correspondam aos critérios desta métrica.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
