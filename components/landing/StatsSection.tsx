"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, Users, FileText, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Resumes Analyzed",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FileText,
    value: "30s",
    label: "Average Processing",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Award,
    value: "4.9/5",
    label: "User Rating",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:shadow-lg transition-shadow`}
                >
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-3xl font-bold text-gradient-primary mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
