import { cn } from "@/lib/utils"
import type { CampaignStatus, ScriptStatus } from "../../types/dashboard"
import { getStatusColor } from "../../utils/colorSystem"

interface StatusIndicatorProps {
  status: CampaignStatus | ScriptStatus
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StatusIndicator({ status, size = "md", className }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  }

  return (
    <div
      className={cn("rounded-full", sizeClasses[size], className)}
      style={{ backgroundColor: getStatusColor(status) }}
      aria-label={`Status: ${status}`}
    />
  )
}
