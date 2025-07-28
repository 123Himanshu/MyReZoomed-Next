"use client"

import { motion } from "framer-motion"
import { FileText, Target, Brain, Download, Search, Zap } from "lucide-react"

const floatingElements = [
  { icon: FileText, color: "text-blue-400", delay: 0, x: "10%", y: "20%" },
  { icon: Target, color: "text-green-400", delay: 1, x: "80%", y: "30%" },
  { icon: Brain, color: "text-purple-400", delay: 2, x: "15%", y: "70%" },
  { icon: Download, color: "text-orange-400", delay: 3, x: "85%", y: "60%" },
  { icon: Search, color: "text-pink-400", delay: 4, x: "50%", y: "15%" },
  { icon: Zap, color: "text-yellow-400", delay: 5, x: "70%", y: "80%" },
]

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-20`}
            style={{ left: element.x, top: element.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            <IconComponent className="h-8 w-8" />
          </motion.div>
        )
      })}
    </div>
  )
}
