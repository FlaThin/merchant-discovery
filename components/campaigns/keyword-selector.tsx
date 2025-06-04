"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { X, Search, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface KeywordSelectorProps {
  keywords: string[]
  selectedKeywords: string[]
  onSelectionChange: (selected: string[]) => void
  initialKeywords: string[]
}

export function KeywordSelector({
  keywords,
  selectedKeywords,
  onSelectionChange,
  initialKeywords,
}: KeywordSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredKeywords = keywords.filter((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleKeyword = (keyword: string) => {
    const isSelected = selectedKeywords.includes(keyword)
    let newSelection: string[]

    if (isSelected) {
      // Não permitir desselecionar se for a única palavra selecionada
      if (selectedKeywords.length === 1) {
        return
      }
      newSelection = selectedKeywords.filter((k) => k !== keyword)
    } else {
      newSelection = [...selectedKeywords, keyword]
    }

    onSelectionChange(newSelection)
  }

  const removeKeyword = (keyword: string) => {
    // Não permitir remover palavras iniciais
    if (initialKeywords.includes(keyword)) {
      return
    }

    const newKeywords = keywords.filter((k) => k !== keyword)
    const newSelection = selectedKeywords.filter((k) => k !== keyword)
    onSelectionChange(newSelection)
  }

  const selectAll = () => {
    onSelectionChange([...keywords])
  }

  const deselectAll = () => {
    // Manter pelo menos as palavras iniciais selecionadas
    onSelectionChange([...initialKeywords])
  }

  return (
    <div className="space-y-4">
      {/* Search and bulk actions */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar palavras-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" onClick={selectAll}>
          Selecionar Todas
        </Button>
        <Button variant="outline" size="sm" onClick={deselectAll}>
          Limpar Seleção
        </Button>
      </div>

      {/* Selection summary */}
      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            {selectedKeywords.length} de {keywords.length} palavras selecionadas
          </span>
        </div>
        {selectedKeywords.length === 1 && <span className="text-xs text-blue-600">Mínimo de 1 palavra necessária</span>}
      </div>

      {/* Keywords grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto p-1">
        {filteredKeywords.map((keyword) => {
          const isSelected = selectedKeywords.includes(keyword)
          const isInitial = initialKeywords.includes(keyword)
          const canRemove = !isInitial
          const canDeselect = selectedKeywords.length > 1 || !isSelected

          return (
            <div
              key={keyword}
              className={cn(
                "group relative flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-sm",
                isSelected ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300",
              )}
              onClick={() => canDeselect && toggleKeyword(keyword)}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
                    isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300 group-hover:border-gray-400",
                  )}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span
                  className={cn("text-sm font-medium truncate", isSelected ? "text-blue-800" : "text-gray-700")}
                  title={keyword}
                >
                  {keyword}
                </span>
                {isInitial && (
                  <Badge variant="outline" className="text-xs ml-auto">
                    inicial
                  </Badge>
                )}
              </div>

              {canRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 ml-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeKeyword(keyword)
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          )
        })}
      </div>

      {filteredKeywords.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p>Nenhuma palavra-chave encontrada</p>
        </div>
      )}
    </div>
  )
}
