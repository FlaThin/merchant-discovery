"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/products/product-card"
import { ProductShowcase } from "@/components/products/product-showcase"
import { products } from "@/data/products"

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [category, setCategory] = useState("all")

  const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Product */}
        <ProductShowcase product={selectedProduct} />

        {/* Categories */}
        <div className="my-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">Explore Nossa Coleção</h2>
            <p className="text-gray-600 mt-2">Descubra os produtos mais avançados do mercado</p>
          </motion.div>

          <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-4 md:grid-cols-5 gap-2">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="headphones">Fones</TabsTrigger>
                <TabsTrigger value="speakers">Caixas</TabsTrigger>
                <TabsTrigger value="watches">Relógios</TabsTrigger>
                <TabsTrigger value="accessories" className="hidden md:block">
                  Acessórios
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} onSelect={() => setSelectedProduct(product)} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Featured Collections */}
        <section className="my-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">Coleções em Destaque</h2>
            <p className="text-gray-600 mt-2">Conjuntos perfeitos para elevar sua experiência</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/70 to-indigo-700/70 z-10 opacity-90 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Home Office Collection"
                width={800}
                height={600}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Coleção Home Office</h3>
                <p className="mb-4">Tudo que você precisa para um espaço de trabalho produtivo</p>
                <Button variant="secondary" className="w-fit">
                  Ver Coleção
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/70 to-cyan-700/70 z-10 opacity-90 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Audio Premium Collection"
                width={800}
                height={600}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Áudio Premium</h3>
                <p className="mb-4">Experiência sonora imersiva para os mais exigentes</p>
                <Button variant="secondary" className="w-fit">
                  Ver Coleção
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
