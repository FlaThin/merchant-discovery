"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { StatusIndicator } from "../ui/status-indicator"
import { ReviewQueue } from "./review-queue"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { MerchantScript } from "../../types/dashboard"

interface MerchantScriptItemProps {
  script: MerchantScript
}

export function MerchantScriptItem({ script }: MerchantScriptItemProps) {
  const [showReviewQueue, setShowReviewQueue] = useState(false)

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: "Concluído",
      pending: "Pendente",
      "in-progress": "Em Progresso",
    }
    return labels[status as keyof typeof labels] || status
  }

  const hasPendingItems = script.pending && script.pending > 0
  const hasReviewQueue = script.reviewQueue && script.reviewQueue.length > 0

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 bg-white hover:shadow-sm transition-shadow duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <StatusIndicator status={script.status} size="sm" />
            <h3 className="font-semibold text-gray-900">{script.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={script.status === "completed" ? "default" : "secondary"}>
              {getStatusLabel(script.status)}
            </Badge>
            {hasPendingItems && hasReviewQueue && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReviewQueue(!showReviewQueue)}
                className="flex items-center gap-1"
              >
                {showReviewQueue ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Ocultar Queue
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Ver Queue ({script.pending})
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Airings</p>
            <p className="font-semibold text-lg">{script.airings}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Live %</p>
            <p className="font-semibold text-lg">{script.livePercent}%</p>
            <Progress value={script.livePercent} className="mt-1 h-2" />
          </div>
          <div>
            <p className="text-gray-600 mb-1">Reviewed</p>
            <p className="font-semibold text-lg">{script.reviewed}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Coverage</p>
            <p className="font-semibold text-lg">{script.coverage}%</p>
            <Progress value={script.coverage} className="mt-1 h-2" />
          </div>
          {script.pending && (
            <div>
              <p className="text-gray-600 mb-1">Pending</p>
              <p className="font-semibold text-lg text-orange-600">{script.pending}</p>
            </div>
          )}
        </div>
      </div>

      {/* Review Queue */}
      {showReviewQueue && hasReviewQueue && <ReviewQueue items={script.reviewQueue!} scriptName={script.name} />}
    </div>
  )
}
