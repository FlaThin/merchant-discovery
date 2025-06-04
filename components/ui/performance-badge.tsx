import { Badge } from "@/components/ui/badge"
import type { PerformanceLevel } from "../../types/dashboard"
import { getPerformanceVariant, colors } from "../../utils/colorSystem"

interface PerformanceBadgeProps {
  performance: PerformanceLevel
}

export function PerformanceBadge({ performance }: PerformanceBadgeProps) {
  const variant = getPerformanceVariant(performance)

  const labels = {
    excellent: "Excelente",
    good: "Bom",
    "needs-attention": "Atenção",
    poor: "Crítico",
  }

  const badgeStyles = {
    success: {
      backgroundColor: colors.success[50],
      color: colors.success[700],
      borderColor: colors.success[200],
    },
    primary: {
      backgroundColor: colors.primary[50],
      color: colors.primary[700],
      borderColor: colors.primary[200],
    },
    warning: {
      backgroundColor: colors.warning[50],
      color: colors.warning[700],
      borderColor: colors.warning[200],
    },
    danger: {
      backgroundColor: colors.danger[50],
      color: colors.danger[700],
      borderColor: colors.danger[200],
    },
  }

  const style = badgeStyles[variant]

  return (
    <Badge className="border" style={style}>
      {labels[performance]}
    </Badge>
  )
}
