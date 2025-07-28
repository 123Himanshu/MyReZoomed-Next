import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "MyReZoomed - AI-Powered Resume Analysis",
  description:
    "Enhance and Score Your Resume Instantly with AI. Get ATS compatibility scores, AI suggestions, and optimized resumes.",
  keywords: "resume, ATS, AI, job search, career, optimization",
  authors: [{ name: "MyReZoomed" }],
  openGraph: {
    title: "MyReZoomed - AI-Powered Resume Analysis",
    description: "Enhance and Score Your Resume Instantly with AI",
    type: "website",
  },
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
            <div className="min-h-screen bg-background text-foreground">{children}</div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
