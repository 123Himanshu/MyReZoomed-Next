"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Upload, Brain, Download, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Your Resume",
    description:
      "Simply drag and drop your resume in PDF, DOC, or DOCX format. Our secure platform processes it instantly.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Brain,
    title: "AI Analysis & Enhancement",
    description:
      "Our advanced AI analyzes your resume, calculates ATS scores, and generates personalized improvement suggestions.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: Download,
    title: "Download Enhanced Resume",
    description:
      "Get your optimized resume with improved content, better formatting, and higher ATS compatibility scores.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="how-it-works" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            How It <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your resume in three simple steps. Our AI-powered platform makes resume optimization effortless
            and effective.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center relative"
                >
                  {/* Step number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm z-10"
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-24 h-24 mx-auto mb-6 rounded-3xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center relative overflow-hidden group hover-glow`}
                  >
                    <IconComponent className={`h-12 w-12 ${step.color} relative z-10`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">{step.description}</p>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2"
                    >
                      <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
