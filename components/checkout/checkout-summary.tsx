"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, Gift } from "lucide-react"

interface SubscriptionPlan {
  name: string
  price: number
  originalPrice: number
  description: string
  features: string[]
  discount: number
  billing: "mensal" | "anual"
}

interface CheckoutSummaryProps {
  selectedPlan: SubscriptionPlan
  subtotal: number
  discount: number
  tax: number
  total: number
}

export function CheckoutSummary({ selectedPlan, subtotal, discount, tax, total }: CheckoutSummaryProps) {
  return (
    <Card className="sticky top-4 backdrop-blur-sm bg-white/80 border border-gray-100 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Resumo da Assinatura</span>
          <Badge variant="secondary">Plano Selecionado</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Plan */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{selectedPlan.name[0]}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{selectedPlan.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedPlan.description}</p>
              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Cobrança {selectedPlan.billing}</Badge>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-gray-900">R$ {selectedPlan.price}/mês</span>
                {selectedPlan.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">R$ {selectedPlan.originalPrice}/mês</span>
                )}
              </div>
            </div>
          </div>

          {/* Plan Features */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Recursos inclusos:</h4>
            <ul className="space-y-1">
              {selectedPlan.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
              {selectedPlan.features.length > 4 && (
                <li className="text-sm text-gray-500">+{selectedPlan.features.length - 4} recursos adicionais</li>
              )}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Plano {selectedPlan.name} (mensal)</span>
            <span>R$ {selectedPlan.originalPrice.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto promocional</span>
              <span>-R$ {discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Impostos</span>
            <span>R$ {tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total mensal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Savings */}
        {discount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">Você está economizando:</span>
              <span className="font-bold text-green-800">R$ {discount.toFixed(2)}/mês</span>
            </div>
          </div>
        )}

        {/* Trial Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Avaliação Gratuita</span>
          </div>
          <p className="text-xs text-blue-700">Primeiros 14 dias grátis. Cancele a qualquer momento.</p>
        </div>

        {/* Promo Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Código promocional</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Digite seu código"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
              Aplicar
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
