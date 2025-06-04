"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ana Silva",
    role: "Designer UX/UI",
    company: "Tech Startup",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Os produtos da TechWave revolucionaram meu workflow. A qualidade é excepcional e o design é simplesmente perfeito.",
  },
  {
    name: "Carlos Santos",
    role: "Desenvolvedor",
    company: "Software House",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Nunca vi produtos com essa qualidade de construção. O suporte ao cliente é fantástico e a entrega foi super rápida.",
  },
  {
    name: "Marina Costa",
    role: "Product Manager",
    company: "Fintech",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Comprei para toda a equipe e todos ficaram impressionados. Vale cada centavo investido. Recomendo sem hesitar!",
  },
]

export function TestimonialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">Depoimentos</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O que nossos
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Clientes Dizem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 50 mil clientes satisfeitos compartilham suas experiências com nossos produtos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 group hover:scale-105">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                      </div>
                      <Quote className="w-8 h-8 text-indigo-200" />
                    </div>

                    <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>

                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
