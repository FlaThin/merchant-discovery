"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight, Heart, Share2 } from "lucide-react"
import type { Product } from "@/data/products"
import { AnimatedBlob } from "@/components/ui/animated-blob"
import { cn } from "@/lib/utils"

interface ProductShowcaseProps {
  product: Product
}

export function ProductShowcase({ product }: ProductShowcaseProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatedBlob
          color="rgba(99, 102, 241, 0.08)"
          size={600}
          position={{ top: "-10%", right: "-15%" }}
          duration={25}
        />
        <AnimatedBlob
          color="rgba(244, 114, 182, 0.06)"
          size={500}
          position={{ bottom: "-10%", left: "-15%" }}
          duration={30}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-6 left-6"
              >
                <div className="flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white border-0 shadow-lg">✨ Novo Lançamento</Badge>
                  )}
                  {product.discount && product.discount > 0 && (
                    <Badge variant="destructive" className="shadow-lg">
                      🔥 -{product.discount}% OFF
                    </Badge>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute bottom-6 right-6"
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-4 h-4",
                                i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                              )}
                            />
                          ))}
                      </div>
                      <span className="text-sm font-medium">{product.rating}/5</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{product.reviewCount} avaliações</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{product.name}</h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                {product.description ||
                  "Experimente a perfeita combinação de design elegante e tecnologia avançada. Este produto foi criado para superar suas expectativas."}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
                  {product.discount && product.discount > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      R$ {(product.price / (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
                {product.discount && product.discount > 0 && (
                  <Badge variant="destructive">Economize {product.discount}%</Badge>
                )}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Cores Disponíveis</h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                      selectedColorIndex === index
                        ? "border-indigo-600 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400",
                    )}
                  >
                    <span className="w-8 h-8 rounded-full" style={{ backgroundColor: color.hex }} title={color.name} />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">Selecionado: {product.colors[selectedColorIndex].name}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/products/${product.id}`} className="flex-1">
                <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Ver Detalhes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button size="lg" variant="outline" className="px-4">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-4">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Frete grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600">Garantia 12 meses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-sm text-gray-600">Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-sm text-gray-600">30 dias devolução</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
