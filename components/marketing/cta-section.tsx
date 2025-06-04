"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedBlob } from "@/components/ui/animated-blob"
import { ArrowRight, Gift, Clock } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatedBlob
          color="rgba(99, 102, 241, 0.08)"
          size={600}
          position={{ top: "-20%", left: "-15%" }}
          duration={25}
        />
        <AnimatedBlob
          color="rgba(244, 114, 182, 0.06)"
          size={500}
          position={{ bottom: "-20%", right: "-15%" }}
          duration={30}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 px-4 py-2">
                <Gift className="w-4 h-4 mr-2" />
                Oferta Especial de Lançamento
              </Badge>

              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Pronto para
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Revolucionar
                </span>
                <br />
                suas Campanhas?
              </h2>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Junte-se a mais de 500 agências que já transformaram seus resultados com nosso dashboard de merchant
                discovery. Comece sua avaliação gratuita hoje.
              </p>
            </div>

            {/* Urgency Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">Oferta por tempo limitado</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-2xl font-bold text-red-800">
                <div className="text-center">
                  <div>23</div>
                  <div className="text-xs text-red-600">HORAS</div>
                </div>
                <div>:</div>
                <div className="text-center">
                  <div>45</div>
                  <div className="text-xs text-red-600">MIN</div>
                </div>
                <div>:</div>
                <div className="text-center">
                  <div>12</div>
                  <div className="text-xs text-red-600">SEG</div>
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">✓</span>
                </div>
                <h3 className="font-semibold text-gray-900">Avaliação Gratuita</h3>
                <p className="text-sm text-gray-600">14 dias sem compromisso</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">24/7</span>
                </div>
                <h3 className="font-semibold text-gray-900">Suporte</h3>
                <p className="text-sm text-gray-600">Atendimento especializado</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">🚀</span>
                </div>
                <h3 className="font-semibold text-gray-900">Setup Rápido</h3>
                <p className="text-sm text-gray-600">Implementação em 24h</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/checkout">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Começar Avaliação Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  Ver Demo Interativa
                </Button>
              </Link>
            </motion.div>

            <p className="text-sm text-gray-500">* Oferta válida até 31/12/2024 ou enquanto durarem os estoques</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
