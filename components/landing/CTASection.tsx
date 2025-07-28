"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, Sparkles, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-8 sm:p-16 text-center overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Floating elements */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-8 w-12 h-12 bg-white/10 rounded-full blur-xl animate-pulse delay-500" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  >
                    <Star className="h-6 w-6 text-yellow-300 fill-current mx-1" />
                  </motion.div>
                ))}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Ready to Transform Your Career?
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto"
            >
              Join over 50,000 professionals who have enhanced their resumes with our AI-powered platform. Get started
              in seconds and land your dream job faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link href="/upload">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 w-full sm:w-auto bg-white text-primary hover:bg-white/90 hover-glow"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Your Resume Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 bg-transparent"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20"
            >
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="text-3xl font-bold text-primary-foreground"
                >
                  50,000+
                </motion.div>
                <div className="text-primary-foreground/80">Resumes Enhanced</div>
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="text-3xl font-bold text-primary-foreground"
                >
                  95%
                </motion.div>
                <div className="text-primary-foreground/80">Success Rate</div>
              </div>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-3xl font-bold text-primary-foreground"
                >
                  &lt; 30s
                </motion.div>
                <div className="text-primary-foreground/80">Processing Time</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
