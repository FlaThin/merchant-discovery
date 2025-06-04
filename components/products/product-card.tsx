"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import type { Product } from "@/data/products"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  onSelect?: () => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {/* Product Image */}
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-green-500 text-white border-0 shadow-md">Novo</Badge>}
            {product.discount && product.discount > 0 && (
              <Badge variant="destructive" className="shadow-md">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2",
            )}
          >
            <Button
              size="icon"
              variant="secondary"
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={cn("w-4 h-4", isFavorited && "fill-red-500 text-red-500")} />
            </Button>
            <Link href={`/products/${product.id}`}>
              <Button
                size="icon"
                variant="secondary"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Quick Add to Cart */}
          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
          >
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Category */}
          <Badge variant="outline" className="text-xs">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={cn("w-4 h-4", i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
                  />
                ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
            {product.discount && product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                R$ {(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Cores:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-600">+{product.colors.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
