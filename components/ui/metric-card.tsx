import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { MetricCardData } from "../../types/dashboard"
import { colors } from "../../utils/colorSystem"

interface MetricCardProps {
  data: MetricCardData
}

export function MetricCard({ data }: MetricCardProps) {
  const { title, value, subtitle, progress, trend, icon: Icon, variant } = data

  const variantStyles = {
    primary: {
      iconColor: colors.primary[500],
      textColor: colors.primary[600],
    },
    success: {
      iconColor: colors.success[500],
      textColor: colors.success[600],
    },
    warning: {
      iconColor: colors.warning[500],
      textColor: colors.warning[600],
    },
    danger: {
      iconColor: colors.danger[500],
      textColor: colors.danger[600],
    },
  }

  const style = variantStyles[variant]

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>

            {progress !== undefined && (
              <Progress
                value={progress}
                className="h-2 mb-2"
                style={{
                  backgroundColor: colors.neutral[200],
                }}
              />
            )}

            {subtitle && (
              <p className="text-sm" style={{ color: style.textColor }}>
                {trend && (
                  <>
                    {trend.startsWith("+") ? (
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 inline mr-1" />
                    )}
                  </>
                )}
                {subtitle}
              </p>
            )}
          </div>
          <Icon className="w-8 h-8 ml-4" style={{ color: style.iconColor }} />
        </div>
      </CardContent>
    </Card>
  )
}
