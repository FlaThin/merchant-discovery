"use client"

import { ValidationPage } from "@/components/pages/validation-page"
import { useDashboardData } from "@/hooks/useDashboardData"

export default function ValidationRoutePage() {
  const { getScriptsNeedingValidation, validateScriptResult } = useDashboardData()
  const scriptsNeedingValidation = getScriptsNeedingValidation()
  return <main className="p-6"><ValidationPage scriptsNeedingValidation={scriptsNeedingValidation} onValidate={validateScriptResult} /></main>
} 