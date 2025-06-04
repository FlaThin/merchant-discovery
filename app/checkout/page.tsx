"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutSummary } from "@/components/checkout/checkout-summary"
import { CheckoutSteps } from "@/components/checkout/checkout-steps"
import { AnimatedBlob } from "@/components/ui/animated-blob"
import { Truck, ShieldCheck, ArrowRight, CheckCircle, Loader2 } from "lucide-react"

type CheckoutStep = "information" | "shipping" | "payment" | "confirmation"

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information")
  const [isProcessing, setIsProcessing] = useState(false)

  // Selected plan data
  const selectedPlan = {
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
    discount: 25,
    billing: "mensal" as const,
  }

  const subtotal = selectedPlan.price
  const discount = selectedPlan.originalPrice - selectedPlan.price
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleNextStep = () => {
    if (currentStep === "information") setCurrentStep("shipping")
    else if (currentStep === "shipping") setCurrentStep("payment")
    else if (currentStep === "payment") {
      setIsProcessing(true)
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep("confirmation")
      }, 2000)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep === "shipping") setCurrentStep("information")
    else if (currentStep === "payment") setCurrentStep("shipping")
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Blobs animados */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <AnimatedBlob
          color="rgba(99, 102, 241, 0.05)"
          size={800}
          position={{ top: "-20%", left: "-10%" }}
          duration={30}
        />
        <AnimatedBlob
          color="rgba(244, 114, 182, 0.05)"
          size={700}
          position={{ bottom: "-30%", right: "-15%" }}
          duration={35}
        />
      </div>

      <Header minimal />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 text-center">Finalizar Assinatura</h1>
            <p className="text-gray-600 text-center mt-2">
              Complete sua assinatura do plano {selectedPlan.name} e comece sua avaliação gratuita
            </p>
          </motion.div>

          <CheckoutSteps currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {currentStep === "information" && (
                  <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-md">
                    <CardHeader>
                      <CardTitle>Informações da Conta</CardTitle>
                      <CardDescription>Crie sua conta para acessar o dashboard</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">Nome</Label>
                          <Input id="first-name" placeholder="Seu nome" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Sobrenome</Label>
                          <Input id="last-name" placeholder="Seu sobrenome" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input id="company" placeholder="Nome da sua empresa" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="(00) 00000-0000" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" placeholder="Crie uma senha segura" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Senha</Label>
                        <Input id="confirm-password" type="password" placeholder="Confirme sua senha" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleNextStep} className="bg-indigo-600 hover:bg-indigo-700">
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {currentStep === "shipping" && (
                  <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-md">
                    <CardHeader>
                      <CardTitle>Informações de Cobrança</CardTitle>
                      <CardDescription>Endereço para emissão da nota fiscal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input id="address" placeholder="Rua, número, complemento" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input id="city" placeholder="Sua cidade" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input id="state" placeholder="Estado" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">CEP</Label>
                          <Input id="zip" placeholder="00000-000" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                        <Input id="cnpj" placeholder="00.000.000/0000-00" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        Voltar
                      </Button>
                      <Button onClick={handleNextStep} className="bg-indigo-600 hover:bg-indigo-700">
                        Continuar para Pagamento
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {currentStep === "payment" && (
                  <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-md">
                    <CardHeader>
                      <CardTitle>Método de Pagamento</CardTitle>
                      <CardDescription>Escolha como deseja pagar sua assinatura</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Tabs defaultValue="credit-card">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="credit-card">Cartão de Crédito</TabsTrigger>
                          <TabsTrigger value="pix">Pix</TabsTrigger>
                          <TabsTrigger value="boleto">Boleto</TabsTrigger>
                        </TabsList>

                        <TabsContent value="credit-card" className="space-y-6 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Número do Cartão</Label>
                            <Input id="card-number" placeholder="0000 0000 0000 0000" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Data de Validade</Label>
                              <Input id="expiry" placeholder="MM/AA" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Nome no Cartão</Label>
                            <Input id="name-on-card" placeholder="Nome como aparece no cartão" />
                          </div>

                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="save-card" className="rounded border-gray-300" />
                            <Label htmlFor="save-card" className="text-sm">
                              Salvar este cartão para futuras cobranças
                            </Label>
                          </div>
                        </TabsContent>

                        <TabsContent value="pix" className="mt-4">
                          <div className="text-center p-6 space-y-4">
                            <div className="mx-auto w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg">
                              <Image
                                src="/placeholder.svg?height=200&width=200"
                                alt="QR Code Pix"
                                width={150}
                                height={150}
                              />
                            </div>
                            <div>
                              <p className="font-medium">Escaneie o QR Code</p>
                              <p className="text-sm text-gray-500">
                                Use o aplicativo do seu banco para escanear o código e efetuar o pagamento
                              </p>
                            </div>
                            <Button variant="outline" className="w-full">
                              Copiar Código Pix
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="boleto" className="mt-4">
                          <div className="text-center p-6 space-y-4">
                            <div className="mx-auto w-full h-24 bg-gray-100 flex items-center justify-center rounded-lg">
                              <p className="font-mono text-sm">34191.79001 01043.510047 91020.150008 7 89140026000</p>
                            </div>
                            <div>
                              <p className="font-medium">Boleto Bancário</p>
                              <p className="text-sm text-gray-500">
                                O boleto será gerado após a confirmação. Vencimento em 3 dias úteis.
                              </p>
                            </div>
                            <Button variant="outline" className="w-full">
                              Gerar Boleto
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        Voltar
                      </Button>
                      <Button
                        onClick={handleNextStep}
                        disabled={isProcessing}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          <>
                            Finalizar Assinatura
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {currentStep === "confirmation" && (
                  <Card className="backdrop-blur-sm bg-white/80 border border-gray-100 shadow-md">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Assinatura Confirmada!</h2>
                        <p className="text-gray-600">
                          Sua assinatura do plano {selectedPlan.name} foi confirmada. Sua avaliação gratuita de 14 dias
                          começou agora!
                        </p>

                        <div className="bg-gray-50 p-4 rounded-lg my-6">
                          <h3 className="font-medium text-gray-900 mb-2">Detalhes da Assinatura</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Plano</span>
                              <span>{selectedPlan.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Valor Mensal</span>
                              <span>R$ {selectedPlan.price}/mês</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Avaliação Gratuita</span>
                              <span>14 dias</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Primeira Cobrança</span>
                              <span>{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                          <Button
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => router.push("/dashboard")}
                          >
                            Acessar Dashboard
                          </Button>
                          <Button variant="outline" className="flex-1" onClick={() => router.push("/")}>
                            Voltar ao Início
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CheckoutSummary
                  selectedPlan={selectedPlan}
                  subtotal={subtotal}
                  discount={discount}
                  tax={tax}
                  total={total}
                />

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Pagamento 100% Seguro</p>
                      <p className="text-xs text-gray-600">Seus dados estão protegidos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Truck className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="text-sm font-medium">Acesso Imediato</p>
                      <p className="text-xs text-gray-600">Dashboard disponível após confirmação</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer minimal />
    </div>
  )
}
