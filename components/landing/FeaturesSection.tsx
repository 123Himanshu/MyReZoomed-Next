"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Brain, Download, Search, Zap, Shield, BarChart, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    title: "Instant ATS Score",
    description:
      "Get immediate feedback on how well your resume matches job requirements and passes through applicant tracking systems with detailed breakdown.",
    icon: Target,
    color: "text-blue-400",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/20",
  },
  {
    title: "Gemini AI Suggestions",
    description:
      "Receive intelligent, personalized recommendations powered by Google's Gemini AI to improve your resume content and structure.",
    icon: Brain,
    color: "text-purple-400",
    bgGradient: "from-purple-500/10 to-purple-600/5",
    borderColor: "border-purple-500/20",
  },
  {
    title: "Professional PDF Download",
    description:
      "Download your enhanced resume in multiple professional PDF formats, optimized for both ATS systems and human recruiters.",
    icon: Download,
    color: "text-green-400",
    bgGradient: "from-green-500/10 to-green-600/5",
    borderColor: "border-green-500/20",
  },
  {
    title: "Smart Keyword Matching",
    description:
      "Advanced keyword analysis identifies missing terms and optimizes your resume for specific job descriptions and industries.",
    icon: Search,
    color: "text-orange-400",
    bgGradient: "from-orange-500/10 to-orange-600/5",
    borderColor: "border-orange-500/20",
  },
  {
    title: "Lightning Fast Processing",
    description:
      "Get comprehensive results in under 30 seconds. Our optimized AI processes your resume instantly for immediate feedback.",
    icon: Zap,
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/10 to-yellow-600/5",
    borderColor: "border-yellow-500/20",
  },
  {
    title: "Privacy & Security First",
    description:
      "Your resume data is processed securely with end-to-end encryption and never stored permanently. Complete privacy guaranteed.",
    icon: Shield,
    color: "text-red-400",
    bgGradient: "from-red-500/10 to-red-600/5",
    borderColor: "border-red-500/20",
  },
  {
    title: "Detailed Analytics",
    description:
      "Comprehensive scoring breakdown with visual charts showing strengths, weaknesses, and improvement opportunities.",
    icon: BarChart,
    color: "text-indigo-400",
    bgGradient: "from-indigo-500/10 to-indigo-600/5",
    borderColor: "border-indigo-500/20",
  },
  {
    title: "Real-time Processing",
    description:
      "Watch your resume being analyzed in real-time with live progress updates and instant feedback as changes are made.",
    icon: Clock,
    color: "text-pink-400",
    bgGradient: "from-pink-500/10 to-pink-600/5",
    borderColor: "border-pink-500/20",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="features" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Powerful Features for <span className="text-gradient-rainbow">Better Resumes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create a resume that stands out and gets you hired. Our AI-powered platform provides
            comprehensive analysis and optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card
                  className={`relative overflow-hidden hover-lift border ${feature.borderColor} bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm h-full`}
                >
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background/50 border-2 ${feature.borderColor} mb-4 group-hover:shadow-lg transition-shadow`}
                    >
                      <IconComponent className={`h-7 w-7 ${feature.color}`} />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
