"use client"

import { useState } from "react"
import { ValidationForm } from "../validation/validation-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle } from "lucide-react"
import type { MerchantScript, ValidationResult } from "../../types/dashboard"

interface ValidationPageProps {
  scriptsNeedingValidation: MerchantScript[]
  onValidate: (scriptId: string, validation: Omit<ValidationResult, "id" | "scriptId">) => void
}

export function ValidationPage({ scriptsNeedingValidation, onValidate }: ValidationPageProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastValidatedScript, setLastValidatedScript] = useState<string>("")

  const handleValidate = (scriptId: string, validation: Omit<ValidationResult, "id" | "scriptId">) => {
    const script = scriptsNeedingValidation.find((s) => s.id === scriptId)
    onValidate(scriptId, validation)
    setLastValidatedScript(script?.name || "")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Validação de Scripts</h1>
        <p className="text-gray-600">Valide e aprove os resultados dos scripts das campanhas</p>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Validação do script "{lastValidatedScript}" salva com sucesso!
          </AlertDescription>
        </Alert>
      )}

      {scriptsNeedingValidation.length === 0 ? (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Todos os scripts foram validados! Não há scripts pendentes de validação.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              {scriptsNeedingValidation.length} script(s) precisam de validação
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            {scriptsNeedingValidation.map((script) => (
              <ValidationForm key={script.id} script={script} onValidate={handleValidate} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
