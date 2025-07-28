"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, Zap, FileText, Star, TrendingUp, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { TypewriterText } from "@/components/ui/typewriter-text"
import { FloatingElements } from "@/components/ui/floating-elements"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      </div>

      <FloatingElements />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="h-4 w-4 mr-2 text-primary" />
            </motion.div>
            <span className="text-gradient-primary">AI-Powered Resume Analysis</span>
            <div className="ml-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
              ))}
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Smart Resume{" "}
              <span className="text-gradient-rainbow">
                <TypewriterText words={["Evaluator", "Optimizer", "Enhancer", "Analyzer"]} className="inline-block" />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Transform your resume with <span className="text-primary font-semibold">AI-powered insights</span> and get{" "}
            <span className="text-primary font-semibold">instant ATS scores</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-muted-foreground mb-12 max-w-4xl mx-auto"
          >
            Join thousands of professionals who've enhanced their careers with our cutting-edge resume analysis
            platform. Get personalized suggestions, ATS optimization, and professional formatting in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/upload">
              <Button
                size="lg"
                className="text-lg px-8 py-6 w-full sm:w-auto relative overflow-hidden group hover-glow"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                />
                <Upload className="h-5 w-5 mr-2" />
                Upload Resume
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 w-full sm:w-auto bg-transparent border-primary/20 hover:bg-primary/5 hover:border-primary/40"
            >
              <FileText className="h-5 w-5 mr-2" />
              See Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground mb-16"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>100% Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span>95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Instant Results</span>
            </div>
          </motion.div>

          {/* Hero illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl border border-border/50 backdrop-blur-sm overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
                <div className="relative h-full flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="text-center"
                  >
                    <div className="relative mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
                      >
                        <FileText className="h-12 w-12 text-primary-foreground" />
                      </motion.div>
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    </div>
                    <h3 className="text-2xl font-bold text-gradient-primary mb-2">AI Resume Analysis</h3>
                    <p className="text-muted-foreground">Interactive preview coming soon</p>
                  </motion.div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 w-32 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">95%</div>
                  <div className="text-xs text-green-300">ATS Score</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 w-32 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">12</div>
                  <div className="text-xs text-blue-300">Improvements</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">AI Enhanced</div>
                  <div className="text-xs text-purple-300">Ready to Download</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
