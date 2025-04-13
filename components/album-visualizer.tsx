"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AlbumVisualizerProps {
  cover: string
  isPlaying: boolean
  color: string
}

export default function AlbumVisualizer({ cover, isPlaying, color }: AlbumVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Create audio visualization effect
  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const visualize = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw circular visualizer bars
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 10
      const barCount = 180
      const barWidth = 2

      for (let i = 0; i < barCount; i++) {
        // Generate random height for visualization effect
        const barHeight = Math.random() * 30 + 5

        const angle = (i / barCount) * Math.PI * 2
        const x1 = centerX + Math.cos(angle) * radius
        const y1 = centerY + Math.sin(angle) * radius
        const x2 = centerX + Math.cos(angle) * (radius + (isPlaying ? barHeight : 0))
        const y2 = centerY + Math.sin(angle) * (radius + (isPlaying ? barHeight : 0))

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
        ctx.lineWidth = barWidth
        ctx.stroke()
      }

      animationId = requestAnimationFrame(visualize)
    }

    visualize()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPlaying])

  return (
    <div className="relative flex justify-center">
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-br opacity-70 blur-xl transition-opacity",
          color,
          isPlaying ? "opacity-70" : "opacity-40",
        )}
        animate={{
          scale: isPlaying ? [1, 1.05, 1] : 1,
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          },
        }}
      />

      <div className="relative">
        <canvas ref={canvasRef} width={300} height={300} className="absolute inset-0 z-10" />

        <motion.div
          className="relative z-0 rounded-full overflow-hidden h-64 w-64 border-4 border-white/10 shadow-xl"
          animate={{
            rotate: isPlaying ? 360 : 0,
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <img
            src={cover || "/image1.png"}
            alt="Album cover"
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-black/20" />

          {/* Center hole */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-black/80 border-2 border-white/20 z-20" />
        </motion.div>
      </div>
    </div>
  )
}
