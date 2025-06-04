import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import type { MerchantScript } from "../../types/dashboard"
import { MerchantScriptItem } from "./merchant-script-item"

interface MerchantScriptsSectionProps {
  scripts: MerchantScript[]
}

export function MerchantScriptsSection({ scripts }: MerchantScriptsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Scripts Detalhados</h3>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Merchant Scripts - Análise Detalhada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scripts.map((script) => (
              <MerchantScriptItem key={script.id} script={script} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
