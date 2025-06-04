"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, CheckCircle, Radio, Target, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Analytics Avançado",
    description: "Métricas em tempo real de suas campanhas com dashboards interativos e insights acionáveis.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: CheckCircle,
    title: "Validação de Scripts",
    description: "Sistema automatizado de validação e aprovação de scripts publicitários com workflow otimizado.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Radio,
    title: "Monitoramento 24/7",
    description: "Acompanhe suas campanhas em tempo real com alertas inteligentes e notificações personalizadas.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Target,
    title: "Otimização de Performance",
    description: "Identifique oportunidades de melhoria e otimize automaticamente suas campanhas.",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Shield,
    title: "Compliance Total",
    description: "Garanta conformidade com regulamentações e padrões da indústria publicitária.",
    color: "from-indigo-400 to-purple-500",
  },
  {
    icon: Zap,
    title: "Automação Inteligente",
    description: "Automatize processos repetitivos e foque no que realmente importa para seu negócio.",
    color: "from-yellow-400 to-orange-500",
  },
]

export function FeatureSection() {
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
            Por que escolher TechWave?
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Recursos
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Poderosos
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para gerenciar e otimizar suas campanhas publicitárias em uma única plataforma
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group hover:scale-105">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
