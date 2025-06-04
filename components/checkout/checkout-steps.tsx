"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckoutStep = "information" | "shipping" | "payment" | "confirmation"

interface CheckoutStepsProps {
  currentStep: CheckoutStep
}

const steps = [
  { id: "information", label: "Informações", description: "Dados pessoais" },
  { id: "shipping", label: "Entrega", description: "Método de envio" },
  { id: "payment", label: "Pagamento", description: "Forma de pagamento" },
  { id: "confirmation", label: "Confirmação", description: "Pedido finalizado" },
]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex
          const isUpcoming = index > currentStepIndex

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted ? "#10b981" : isCurrent ? "#6366f1" : "#e5e7eb",
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm border-2",
                    isCompleted && "border-green-500",
                    isCurrent && "border-indigo-500 shadow-lg",
                    isUpcoming && "border-gray-300 bg-gray-200 text-gray-500",
                  )}
                >
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>

                {/* Step Label */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCompleted && "text-green-600",
                      isCurrent && "text-indigo-600",
                      isUpcoming && "text-gray-500",
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-px mx-4 relative">
                  <div className="absolute inset-0 bg-gray-300" />
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: index < currentStepIndex ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute inset-0 bg-green-500"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
