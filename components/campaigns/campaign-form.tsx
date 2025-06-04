"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, X, Save, Tag, Sparkles, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { KeywordSelector } from "./keyword-selector"
import type { NewCampaign } from "../../types/dashboard"
import { cn } from "@/lib/utils"

interface CampaignFormProps {
  onSubmit: (campaign: NewCampaign) => void
}

type FormStep = "basic" | "keywords" | "review"

export function CampaignForm({ onSubmit }: CampaignFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("basic")
  const [name, setName] = useState("")
  const [initialKeywords, setInitialKeywords] = useState<string[]>([])
  const [currentKeyword, setCurrentKeyword] = useState("")
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([])
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addKeyword = () => {
    if (currentKeyword.trim() && initialKeywords.length < 3 && !initialKeywords.includes(currentKeyword.trim())) {
      setInitialKeywords([...initialKeywords, currentKeyword.trim()])
      setCurrentKeyword("")
      setError(null)
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setInitialKeywords(initialKeywords.filter((keyword) => keyword !== keywordToRemove))
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  const generateSuggestions = async () => {
    if (initialKeywords.length === 0) {
      setError("Adicione pelo menos uma palavra-chave para gerar sugestões")
      return
    }

    setIsLoadingSuggestions(true)
    setError(null)

    try {
      // Simular chamada para backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock de palavras sugeridas baseadas nas iniciais
      const mockSuggestions = [
        ...initialKeywords,
        "produto natural",
        "alívio rápido",
        "medicamento",
        "tratamento",
        "saúde",
        "bem-estar",
        "farmácia",
        "remédio caseiro",
        "terapia natural",
        "cuidados pessoais",
        "medicina alternativa",
        "suplemento",
      ]

      setSuggestedKeywords(mockSuggestions)
      setSelectedKeywords([...initialKeywords]) // Iniciais ficam selecionadas por padrão
      setCurrentStep("keywords")
    } catch (err) {
      setError("Erro ao gerar sugestões. Tente novamente.")
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  const handleKeywordSelection = (keywords: string[]) => {
    setSelectedKeywords(keywords)
    setError(null)
  }

  const proceedToReview = () => {
    if (selectedKeywords.length === 0) {
      setError("Selecione pelo menos uma palavra-chave")
      return
    }
    setCurrentStep("review")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || selectedKeywords.length === 0) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        keywords: selectedKeywords,
      })
      // Reset form
      setName("")
      setInitialKeywords([])
      setSelectedKeywords([])
      setSuggestedKeywords([])
      setCurrentKeyword("")
      setCurrentStep("basic")
      setError(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    if (currentStep === "keywords") {
      setCurrentStep("basic")
    } else if (currentStep === "review") {
      setCurrentStep("keywords")
    }
  }

  const resetForm = () => {
    setName("")
    setInitialKeywords([])
    setSelectedKeywords([])
    setSuggestedKeywords([])
    setCurrentKeyword("")
    setCurrentStep("basic")
    setError(null)
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Campanha
          </CardTitle>
          {currentStep !== "basic" && (
            <Button variant="ghost" size="sm" onClick={resetForm}>
              Recomeçar
            </Button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-4">
          <div className={cn("flex items-center gap-2", currentStep === "basic" ? "text-blue-600" : "text-green-600")}>
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                currentStep === "basic" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600",
              )}
            >
              {currentStep === "basic" ? "1" : <CheckCircle className="w-4 h-4" />}
            </div>
            <span className="text-sm font-medium">Informações Básicas</span>
          </div>
          <div className="flex-1 h-px bg-gray-200" />
          <div
            className={cn(
              "flex items-center gap-2",
              currentStep === "keywords"
                ? "text-blue-600"
                : currentStep === "review"
                  ? "text-green-600"
                  : "text-gray-400",
            )}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                currentStep === "keywords"
                  ? "bg-blue-100 text-blue-600"
                  : currentStep === "review"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400",
              )}
            >
              {currentStep === "review" ? <CheckCircle className="w-4 h-4" /> : "2"}
            </div>
            <span className="text-sm font-medium">Palavras-chave</span>
          </div>
          <div className="flex-1 h-px bg-gray-200" />
          <div className={cn("flex items-center gap-2", currentStep === "review" ? "text-blue-600" : "text-gray-400")}>
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                currentStep === "review" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400",
              )}
            >
              3
            </div>
            <span className="text-sm font-medium">Revisão</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Basic Information */}
        {currentStep === "basic" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Nome da Campanha</Label>
              <Input
                id="campaign-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Pomada Negra, Vitamina C..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">
                Palavras-chave Iniciais <span className="text-sm text-gray-500">(até 3)</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="keywords"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={handleKeywordKeyPress}
                  placeholder="Digite uma palavra-chave..."
                  disabled={initialKeywords.length >= 3}
                />
                <Button
                  type="button"
                  onClick={addKeyword}
                  disabled={
                    !currentKeyword.trim() ||
                    initialKeywords.length >= 3 ||
                    initialKeywords.includes(currentKeyword.trim())
                  }
                  size="sm"
                >
                  <Tag className="w-4 h-4" />
                </Button>
              </div>

              {initialKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {initialKeywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                      {keyword}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                        onClick={() => removeKeyword(keyword)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-500">
                {initialKeywords.length}/3 palavras-chave adicionadas. Usaremos estas para gerar sugestões inteligentes.
              </p>
            </div>

            <Button
              onClick={generateSuggestions}
              disabled={!name.trim() || initialKeywords.length === 0 || isLoadingSuggestions}
              className="w-full"
            >
              {isLoadingSuggestions ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando sugestões...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gerar Sugestões Inteligentes
                </>
              )}
            </Button>
          </div>
        )}

        {/* Step 2: Keyword Selection */}
        {currentStep === "keywords" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Selecione as Palavras-chave</h3>
              <p className="text-sm text-gray-600 mb-4">
                Baseado nas suas palavras iniciais, geramos sugestões inteligentes. Selecione as que melhor representam
                sua campanha.
              </p>
            </div>

            <KeywordSelector
              keywords={suggestedKeywords}
              selectedKeywords={selectedKeywords}
              onSelectionChange={handleKeywordSelection}
              initialKeywords={initialKeywords}
            />

            <div className="flex gap-3">
              <Button variant="outline" onClick={goBack} className="flex-1">
                Voltar
              </Button>
              <Button onClick={proceedToReview} disabled={selectedKeywords.length === 0} className="flex-1">
                Continuar ({selectedKeywords.length} selecionadas)
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === "review" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Revisar Campanha</h3>

              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Nome da Campanha</Label>
                  <p className="text-lg font-semibold">{name}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Palavras-chave Selecionadas ({selectedKeywords.length})
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant={initialKeywords.includes(keyword) ? "default" : "secondary"}
                        className="text-sm"
                      >
                        {keyword}
                        {initialKeywords.includes(keyword) && (
                          <span className="ml-1 text-xs opacity-75">(inicial)</span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={goBack} className="flex-1">
                Voltar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Criar Campanha
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
