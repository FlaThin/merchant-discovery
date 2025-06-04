"use client"

import { useState } from "react"
import type {
  Campaign,
  MerchantScript,
  CampaignMetrics,
  NewCampaign,
  ValidationResult,
  DateRange,
} from "../types/dashboard"

export function useDashboardData() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date("2025-06-03"),
    to: new Date("2025-06-03"),
  })

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Pomada Negra",
      keywords: ["pomada", "negra", "medicamento"],
      status: "active",
      airings: 120,
      livePercent: 92,
      scripts: { completed: 5, total: 7 },
      performance: "excellent",
      createdAt: new Date("2025-01-01"),
    },
    {
      id: "2",
      name: "Polimax",
      keywords: ["polimax", "vitamina"],
      status: "warning",
      airings: 44,
      livePercent: 63,
      scripts: { completed: 2, total: 6 },
      performance: "needs-attention",
      createdAt: new Date("2025-01-15"),
    },
  ])

  const [merchantScripts, setMerchantScripts] = useState<MerchantScript[]>([
    {
      id: "1",
      name: "Pomada Negra Spot",
      campaignId: "1",
      airings: 95,
      livePercent: 90,
      reviewed: 12,
      coverage: 100,
      status: "completed",
      validationResults: [
        {
          id: "v1",
          scriptId: "1",
          content: "Verificar se menciona benefícios corretamente",
          isValid: true,
          validatedAt: new Date("2025-01-10"),
          validatedBy: "João Silva",
        },
      ],
    },
    {
      id: "2",
      name: "Pomada Negra Short",
      campaignId: "1",
      airings: 25,
      livePercent: 60,
      reviewed: 0,
      pending: 3,
      coverage: 0,
      status: "pending",
      reviewQueue: [
        {
          id: "r1",
          station: "Radio 99.9",
          dateTime: new Date("2025-05-13T08:15:00"),
          snippet: "Alívio rápido com Pomada Negra — produto 100% natural",
          score: 0.83,
          audioUrl: "/audio/sample1.mp3",
        },
        {
          id: "r2",
          station: "FM 101.5",
          dateTime: new Date("2025-05-13T14:30:00"),
          snippet: "Pomada Negra, a solução natural para suas dores",
          score: 0.91,
          audioUrl: "/audio/sample2.mp3",
        },
        {
          id: "r3",
          station: "Radio Mix",
          dateTime: new Date("2025-05-13T19:45:00"),
          snippet: "Experimente Pomada Negra e sinta a diferença",
          score: 0.76,
          audioUrl: "/audio/sample3.mp3",
        },
      ],
      validationResults: [
        {
          id: "v2",
          scriptId: "2",
          content: "Validar tempo de duração do anúncio",
          isValid: false,
          notes: "Duração excede limite permitido",
        },
      ],
    },
    {
      id: "3",
      name: "Polimax Standard",
      campaignId: "2",
      airings: 30,
      livePercent: 55,
      reviewed: 8,
      coverage: 45,
      status: "in-progress",
    },
    {
      id: "4",
      name: "Polimax Extended",
      campaignId: "2",
      airings: 14,
      livePercent: 70,
      reviewed: 2,
      pending: 1,
      coverage: 25,
      status: "pending",
      reviewQueue: [
        {
          id: "r4",
          station: "Radio Central",
          dateTime: new Date("2025-05-13T12:00:00"),
          snippet: "Polimax vitaminas para uma vida mais saudável",
          score: 0.88,
          audioUrl: "/audio/sample4.mp3",
        },
      ],
    },
  ])

  // Função para adicionar nova campanha
  const addCampaign = (newCampaign: NewCampaign) => {
    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      keywords: newCampaign.keywords,
      status: "active",
      airings: 0,
      livePercent: 0,
      scripts: { completed: 0, total: 0 },
      performance: "good",
      createdAt: new Date(),
    }
    setCampaigns((prev) => [...prev, campaign])
    return campaign
  }

  // Função para validar resultado de script
  const validateScriptResult = (scriptId: string, validationResult: Omit<ValidationResult, "id" | "scriptId">) => {
    const newValidation: ValidationResult = {
      id: Date.now().toString(),
      scriptId,
      ...validationResult,
      validatedAt: new Date(),
    }

    setMerchantScripts((prev) =>
      prev.map((script) => {
        if (script.id === scriptId) {
          return {
            ...script,
            validationResults: [...(script.validationResults || []), newValidation],
          }
        }
        return script
      }),
    )
  }

  // Métricas globais
  const globalMetrics = {
    totalAirings: campaigns.reduce((sum, campaign) => sum + campaign.airings, 0),
    averageLivePercent: Math.round(
      campaigns.reduce((sum, campaign) => sum + campaign.livePercent, 0) / campaigns.length,
    ),
    scriptsProgress: {
      completed: campaigns.reduce((sum, campaign) => sum + campaign.scripts.completed, 0),
      total: campaigns.reduce((sum, campaign) => sum + campaign.scripts.total, 0),
    },
    stationsAtRisk: 3,
  }

  const getScriptsByCampaign = (campaignId: string) => {
    return merchantScripts.filter((script) => script.campaignId === campaignId)
  }

  const getCampaignById = (campaignId: string) => {
    return campaigns.find((campaign) => campaign.id === campaignId)
  }

  const getCampaignMetrics = (campaignId: string): CampaignMetrics | null => {
    const campaign = getCampaignById(campaignId)
    if (!campaign) return null

    const campaignScripts = getScriptsByCampaign(campaignId)
    const scriptsAtRisk = campaignScripts.filter((script) => script.status === "pending" || script.coverage < 50).length

    return {
      totalAirings: campaign.airings,
      livePercent: campaign.livePercent,
      scriptsProgress: campaign.scripts,
      scriptsAtRisk,
      campaignName: campaign.name,
    }
  }

  // Scripts que precisam de validação
  const getScriptsNeedingValidation = () => {
    return merchantScripts.filter((script) => {
      const hasInvalidResults = script.validationResults?.some((result) => !result.isValid)
      const hasNoValidation = !script.validationResults || script.validationResults.length === 0
      return hasInvalidResults || hasNoValidation
    })
  }

  return {
    campaigns,
    merchantScripts,
    globalMetrics,
    dateRange,
    setDateRange,
    getScriptsByCampaign,
    getCampaignById,
    getCampaignMetrics,
    getScriptsNeedingValidation,
    addCampaign,
    validateScriptResult,
  }
}
