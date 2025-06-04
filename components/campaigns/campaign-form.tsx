"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Tag } from "lucide-react"
import type { NewCampaign } from "../../types/dashboard"

interface CampaignFormProps {
  onSubmit: (campaign: NewCampaign) => void
}

export function CampaignForm({ onSubmit }: CampaignFormProps) {
  const [name, setName] = useState("")
  const [keywords, setKeywords] = useState<string[]>([])
  const [currentKeyword, setCurrentKeyword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addKeyword = () => {
    if (currentKeyword.trim() && keywords.length < 3 && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()])
      setCurrentKeyword("")
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || keywords.length === 0) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        keywords,
      })
      // Reset form
      setName("")
      setKeywords([])
      setCurrentKeyword("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nova Campanha
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome da campanha */}
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

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords">
              Palavras-chave <span className="text-sm text-gray-500">(máximo 3)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="keywords"
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyPress={handleKeywordKeyPress}
                placeholder="Digite uma palavra-chave..."
                disabled={keywords.length >= 3}
              />
              <Button
                type="button"
                onClick={addKeyword}
                disabled={!currentKeyword.trim() || keywords.length >= 3 || keywords.includes(currentKeyword.trim())}
                size="sm"
              >
                <Tag className="w-4 h-4" />
              </Button>
            </div>

            {/* Lista de keywords */}
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {keywords.map((keyword) => (
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
              {keywords.length}/3 palavras-chave adicionadas. Pressione Enter ou clique no ícone para adicionar.
            </p>
          </div>

          {/* Submit button */}
          <Button type="submit" disabled={!name.trim() || keywords.length === 0 || isSubmitting} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Criando..." : "Criar Campanha"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
