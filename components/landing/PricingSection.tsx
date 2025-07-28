"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Crown, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started with resume optimization",
    icon: Zap,
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/20",
    features: [
      "1 resume analysis per month",
      "Basic ATS score",
      "5 AI suggestions",
      "Standard PDF download",
      "Email support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Best for active job seekers and professionals",
    icon: Sparkles,
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-purple-600/5",
    borderColor: "border-purple-500/20",
    features: [
      "Unlimited resume analyses",
      "Advanced ATS scoring",
      "Unlimited AI suggestions",
      "Multiple PDF templates",
      "Keyword optimization",
      "Priority support",
      "Resume tracking",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$29.99",
    period: "/month",
    description: "For teams and organizations",
    icon: Crown,
    color: "text-gold-400",
    bgGradient: "from-yellow-500/10 to-yellow-600/5",
    borderColor: "border-yellow-500/20",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Bulk resume processing",
      "Custom branding",
      "API access",
      "Dedicated support",
      "Analytics dashboard",
      "White-label solution",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="pricing" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient-primary">Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI-powered resume analysis features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <Card
                  className={`h-full hover-lift border ${plan.borderColor} bg-gradient-to-br ${plan.bgGradient} backdrop-blur-sm ${plan.popular ? "ring-2 ring-primary/20 scale-105" : ""}`}
                >
                  <CardHeader className="text-center pb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-background/50 border-2 ${plan.borderColor} flex items-center justify-center`}
                    >
                      <IconComponent className={`h-8 w-8 ${plan.color}`} />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gradient-primary">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 }}
                          className="flex items-center"
                        >
                          <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Link href="/upload" className="block">
                      <Button
                        className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
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
