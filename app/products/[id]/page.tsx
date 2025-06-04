"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGallery } from "@/components/products/product-gallery"
import { ProductReviews } from "@/components/products/product-reviews"
import { ProductFeatures } from "@/components/products/product-features"
import { RelatedProducts } from "@/components/products/related-products"
import { products } from "@/data/products"
import { ShoppingCart, Heart, Share2, Check, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = products.find((p) => p.id === params.id) || products[0]

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const handleAddToCart = () => {
    router.push("/checkout")
  }

  const handleBuyNow = () => {
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <ProductGallery product={product} selectedColor={selectedColor} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
                {product.isNew && <Badge className="bg-green-500">Novo</Badge>}
                {product.discount > 0 && <Badge variant="destructive">-{product.discount}%</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              <div className="flex items-center gap-2 mt-2">
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
                <span className="text-sm text-gray-600">{product.reviewCount} avaliações</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="text-lg text-gray-500 line-through">
                  R$ {(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Cor</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2",
                        selectedColor.name === color.name ? "border-indigo-600" : "border-transparent",
                      )}
                    >
                      <span className="w-8 h-8 rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">Selecionado: {selectedColor.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantidade</h3>
                <div className="flex items-center border rounded-md w-32">
                  <button
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button onClick={handleAddToCart} variant="outline" className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
                <Button onClick={handleBuyNow} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  Comprar Agora
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                  <Heart className="mr-1 h-4 w-4" />
                  Adicionar aos Favoritos
                </button>
                <button className="flex items-center text-sm text-gray-600 hover:text-indigo-600">
                  <Share2 className="mr-1 h-4 w-4" />
                  Compartilhar
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Frete grátis para todo o Brasil</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Garantia de 12 meses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">30 dias para devolução</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            <div className="mt-8">
              <TabsContent value="description" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Sobre o {product.name}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description ||
                      `
                      Este produto de última geração combina design elegante com tecnologia de ponta.
                      Desenvolvido para proporcionar uma experiência excepcional, o ${product.name} 
                      é perfeito para quem busca qualidade premium e desempenho superior.
                      
                      Com materiais de alta qualidade e acabamento impecável, este produto foi 
                      projetado para durar e impressionar.
                    `}
                  </p>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Especificações Técnicas</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Modelo</span>
                          <span className="font-medium">{product.name}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Conectividade</span>
                          <span className="font-medium">Bluetooth 5.2</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Bateria</span>
                          <span className="font-medium">Até 30 horas</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Peso</span>
                          <span className="font-medium">250g</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Dimensões</span>
                          <span className="font-medium">18 x 15 x 8 cm</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">O que vem na caixa</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-indigo-600" />
                          <span>1x {product.name}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-indigo-600" />
                          <span>1x Cabo de carregamento USB-C</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-indigo-600" />
                          <span>1x Estojo de transporte</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-indigo-600" />
                          <span>1x Manual do usuário</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-indigo-600" />
                          <span>1x Cartão de garantia</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="features">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductFeatures product={product} />
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductReviews product={product} />
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} />
      </main>

      <Footer />
    </div>
  )
}
