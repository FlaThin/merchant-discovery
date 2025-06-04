import type React from "react"

export interface Campaign {
  id: string
  name: string
  keywords: string[]
  status: CampaignStatus
  airings: number
  livePercent: number
  scripts: ScriptProgress
  performance: PerformanceLevel
  createdAt: Date
}

export interface MerchantScript {
  id: string
  name: string
  campaignId: string
  airings: number
  livePercent: number
  reviewed: number
  coverage: number
  status: ScriptStatus
  pending?: number
  validationResults?: ValidationResult[]
  reviewQueue?: ReviewQueueItem[]
}

export interface ReviewQueueItem {
  id: string
  station: string
  dateTime: Date
  snippet: string
  score: number
  audioUrl?: string
}

export interface ValidationResult {
  id: string
  scriptId: string
  content: string
  isValid: boolean
  validatedAt?: Date
  validatedBy?: string
  notes?: string
}

export interface MetricCardData {
  title: string
  value: string | number
  subtitle?: string
  progress?: number
  trend?: string
  icon: React.ComponentType<{ className?: string }>
  variant: "primary" | "success" | "warning" | "danger"
}

export interface CampaignMetrics {
  totalAirings: number
  livePercent: number
  scriptsProgress: { completed: number; total: number }
  scriptsAtRisk: number
  campaignName: string
}

export interface DateRange {
  from: Date
  to: Date
}

export type CampaignStatus = "active" | "warning" | "inactive"
export type ScriptStatus = "completed" | "pending" | "in-progress"
export type PerformanceLevel = "excellent" | "good" | "needs-attention" | "poor"
export type NavigationPage = "dashboard" | "campaigns" | "validation"

export interface ScriptProgress {
  completed: number
  total: number
}

export interface NewCampaign {
  name: string
  keywords: string[]
}
