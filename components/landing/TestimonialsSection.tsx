"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    content:
      "This platform transformed my resume completely! I got 3 interview calls within a week of using the AI-enhanced version. The ATS score improvement was incredible.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    content:
      "The AI suggestions were spot-on. It identified gaps I never noticed and helped me highlight my achievements better. Landed my dream job at Microsoft!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Netflix",
    avatar: "/placeholder.svg?height=40&width=40&text=ER",
    content:
      "Amazing tool! The keyword optimization feature helped my resume pass through ATS filters. The interface is intuitive and the results are professional.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "UX Designer",
    company: "Apple",
    avatar: "/placeholder.svg?height=40&width=40&text=DK",
    content:
      "I was skeptical at first, but the AI really understood my industry. The enhanced resume looked so much more professional and got me noticed by top companies.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "Amazon",
    avatar: "/placeholder.svg?height=40&width=40&text=LT",
    content:
      "The detailed analysis and suggestions were incredibly helpful. My resume went from good to exceptional. Highly recommend this to anyone job hunting!",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "DevOps Engineer",
    company: "Tesla",
    avatar: "/placeholder.svg?height=40&width=40&text=JW",
    content:
      "Fast, accurate, and incredibly useful. The AI caught formatting issues and content gaps that I missed. Worth every penny for the career boost it provided.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            What Our <span className="text-gradient-primary">Users Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their careers with our AI-powered resume optimization
            platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-lift border-primary/10 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

                  {/* Author */}
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
