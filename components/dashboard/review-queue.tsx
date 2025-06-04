"use client"

import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card"
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
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Station</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Date/Time</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Snippet</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Score</th>
                <th className="text-left py-2 px-3 font-medium text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-1">
                      <Radio className="w-3 h-3 text-gray-400" />
                      <span className="font-medium text-sm">{item.station}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      {format(item.dateTime, "yyyy-MM-dd HH:mm", { locale: ptBR })}
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <p className="text-sm max-w-xs truncate" title={item.snippet}>
                      {item.snippet}
                    </p>
                  </td>
                  <td className="py-2 px-3">
                    <Badge variant={getScoreVariant(item.score)} className="font-mono text-xs">
                      {item.score.toFixed(2)}
                    </Badge>
                  </td>
                  <td className="py-2 px-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePlayAudio(item.audioUrl)}
                      className="flex items-center gap-1 h-7 text-xs"
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
      </CardContent>
    </Card>
  )
}
