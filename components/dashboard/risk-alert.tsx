import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { colors } from "../../utils/colorSystem"

interface RiskAlertProps {
  riskCount: number
  isGlobal?: boolean
  campaignName?: string
}

export function RiskAlert({ riskCount, isGlobal = true, campaignName }: RiskAlertProps) {
  if (riskCount === 0) return null

  return (
    <Alert
      className="mb-6 border"
      style={{
        borderColor: colors.danger[200],
        backgroundColor: colors.danger[50],
      }}
    >
      <AlertTriangle className="h-4 w-4" style={{ color: colors.danger[600] }} />
      <AlertDescription style={{ color: colors.danger[800] }}>
        <strong>
          {riskCount} {isGlobal ? "estações" : "scripts"} em risco
        </strong>{" "}
        - {isGlobal ? "Requer atenção imediata para manter a performance das campanhas" : `na campanha ${campaignName}`}
      </AlertDescription>
    </Alert>
  )
}
