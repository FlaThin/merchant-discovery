"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Radio } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { ReviewQueueItem } from "../../types/dashboard"

interface ReviewQueueProps {
  items: ReviewQueueItem[]
  scriptName: string
}

export function ReviewQueue({ items, scriptName }: ReviewQueueProps) {
  const handlePlayAudio = (audioUrl?: string) => {
    if (audioUrl) {
      // Em produção, isso reproduziria o áudio
      console.log("Playing audio:", audioUrl)
      // Exemplo: new Audio(audioUrl).play()
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600"
    if (score >= 0.6) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreVariant = (score: number) => {
    if (score >= 0.8) return "default"
    if (score >= 0.6) return "secondary"
    return "destructive"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="w-5 h-5" />
          Review Queue - {scriptName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Radio className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum item na fila de revisão</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Station</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Date/Time</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Snippet</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Score</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <Radio className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{item.station}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          {format(item.dateTime, "yyyy-MM-dd HH:mm", { locale: ptBR })}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <p className="text-sm max-w-md truncate" title={item.snippet}>
                          {item.snippet}
                        </p>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={getScoreVariant(item.score)} className="font-mono">
                          {item.score.toFixed(2)}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePlayAudio(item.audioUrl)}
                          className="flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          Play
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
