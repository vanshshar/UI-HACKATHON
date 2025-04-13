"use client"

import { motion } from "framer-motion"
import { Wand2, Search, Zap, LayoutGrid } from "lucide-react"

interface FeatureCardProps {
  feature: {
    title: string
    description: string
    icon: string
    color: string
  }
  index: number
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const icons = {
    wand: Wand2,
    search: Search,
    zap: Zap,
    layout: LayoutGrid,
  }

  const IconComponent = icons[feature.icon as keyof typeof icons]

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.color} mb-4 flex items-center justify-center`}>
        <IconComponent className="h-6 w-6 text-white" />
      </div>

      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-zinc-600">{feature.description}</p>
    </motion.div>
  )
}
