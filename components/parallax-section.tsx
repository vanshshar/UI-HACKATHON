"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <section ref={ref} className="py-20 overflow-hidden relative bg-zinc-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"
          style={{ y: y2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center max-w-3xl mx-auto" style={{ opacity }}>
          <motion.h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ y: y3 }}>
            Create stunning animations with ease
          </motion.h2>

          <motion.p className="text-lg text-zinc-300 mb-8" style={{ y: y4 }}>
            Our platform makes it simple to add beautiful animations and transitions to your website, no coding
            required.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
