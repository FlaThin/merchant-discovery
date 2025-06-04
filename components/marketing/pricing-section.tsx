"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: 299,
    originalPrice: 399,
    description: "Perfeito para pequenas agências",
    features: [
      "Até 5 campanhas ativas",
      "Dashboard básico",
      "Validação manual de scripts",
      "Suporte por email",
      "Relatórios mensais",
    ],
    popular: false,
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "Professional",
    price: 599,
    originalPrice: 799,
    description: "Ideal para agências em crescimento",
    features: [
      "Até 25 campanhas ativas",
      "Dashboard avançado com analytics",
      "Validação automática de scripts",
      "Suporte prioritário 24/7",
      "Relatórios em tempo real",
      "API de integração",
      "Alertas personalizados",
    ],
    popular: true,
    color: "from-indigo-500 to-purple-600",
  },
  {
    name: "Enterprise",
    price: 1299,
    originalPrice: 1699,
    description: "Para grandes agências e redes",
    features: [
      "Campanhas ilimitadas",
      "Dashboard white-label",
      "IA para otimização automática",
      "Suporte dedicado",
      "Relatórios customizados",
      "Integrações avançadas",
      "Treinamento personalizado",
      "SLA garantido",
    ],
    popular: false,
    color: "from-purple-500 to-pink-600",
  },
]

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
            Planos e Preços
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Escolha o
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Plano Ideal
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofertas especiais por tempo limitado. Economize até 40% em todos os planos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 px-4 py-2">
                    <Star className="w-4 h-4 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full transition-all duration-300 border-2 ${
                  plan.popular
                    ? "border-indigo-200 shadow-xl scale-105 bg-white"
                    : "border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                  >
                    <span className="text-white font-bold text-xl">{plan.name[0]}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900">R$ {plan.price}</span>
                      <span className="text-lg text-gray-500 line-through">R$ {plan.originalPrice}</span>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      Economize R$ {plan.originalPrice - plan.price}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/checkout" className="block">
                    <Button
                      className={`w-full py-3 ${
                        plan.popular
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                          : "bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {plan.popular ? "Começar Agora" : "Escolher Plano"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
