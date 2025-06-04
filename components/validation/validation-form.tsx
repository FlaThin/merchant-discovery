"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Save, FileText } from "lucide-react"
import type { MerchantScript, ValidationResult } from "../../types/dashboard"

interface ValidationFormProps {
  script: MerchantScript
  onValidate: (scriptId: string, validation: Omit<ValidationResult, "id" | "scriptId">) => void
}

export function ValidationForm({ script, onValidate }: ValidationFormProps) {
  const [content, setContent] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isValid === null) return

    setIsSubmitting(true)
    try {
      await onValidate(script.id, {
        content: content.trim(),
        isValid,
        notes: notes.trim() || undefined,
        validatedBy: "Admin User", // Em produção, viria do contexto do usuário
      })
      // Reset form
      setContent("")
      setIsValid(null)
      setNotes("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: "Concluído",
      pending: "Pendente",
      "in-progress": "Em Progresso",
    }
    return labels[status as keyof typeof labels] || status
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {script.name}
          </CardTitle>
          <Badge variant={script.status === "completed" ? "default" : "secondary"}>
            {getStatusLabel(script.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Script info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Airings</p>
              <p className="font-semibold">{script.airings}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Live %</p>
              <p className="font-semibold">{script.livePercent}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Coverage</p>
              <p className="font-semibold">{script.coverage}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Reviewed</p>
              <p className="font-semibold">{script.reviewed}</p>
            </div>
          </div>

          {/* Previous validations */}
          {script.validationResults && script.validationResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Validações Anteriores</h4>
              <div className="space-y-2">
                {script.validationResults.map((validation) => (
                  <div key={validation.id} className="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                    {validation.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{validation.content}</p>
                      {validation.notes && <p className="text-sm text-gray-600 mt-1">{validation.notes}</p>}
                      <p className="text-xs text-gray-500 mt-1">
                        {validation.validatedBy} •{" "}
                        {validation.validatedAt?.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Validation form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="validation-content">Descrição da Validação</Label>
              <Textarea
                id="validation-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Descreva o que está sendo validado..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Resultado da Validação</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={isValid === true ? "default" : "outline"}
                  onClick={() => setIsValid(true)}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Válido
                </Button>
                <Button
                  type="button"
                  variant={isValid === false ? "destructive" : "outline"}
                  onClick={() => setIsValid(false)}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Inválido
                </Button>
              </div>
            </div>

            {isValid === false && (
              <div className="space-y-2">
                <Label htmlFor="validation-notes">Observações (opcional)</Label>
                <Textarea
                  id="validation-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Descreva os problemas encontrados..."
                />
              </div>
            )}

            <Button type="submit" disabled={!content.trim() || isValid === null || isSubmitting} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Salvando..." : "Salvar Validação"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
