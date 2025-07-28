"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  index < currentStep
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : index === currentStep
                      ? "bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                    <Check className="h-5 w-5" />
                  </motion.div>
                ) : (
                  index + 1
                )}
              </motion.div>
              <div className="ml-4 hidden sm:block">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className="h-0.5 bg-muted relative overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: index < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile step indicator */}
      <div className="sm:hidden text-center">
        <p className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </p>
        <p className="text-xs text-muted-foreground">{steps[currentStep].description}</p>
      </div>
    </div>
  )
}
