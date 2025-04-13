"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { ArrowRight, ArrowDown, CheckCircle2, ExternalLink, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import AnimatedText from "@/components/animated-text"
import FeatureCard from "@/components/feature-card"
import ParallaxSection from "@/components/parallax-section"
import AnimatedCursor from "@/components/animated-cursor"
import image1 from "@/components/image1.png"
import image3 from "@/components/image3.png"

export default function AnimatedLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: false, amount: 0.2 })

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "20%"])
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "100%"])
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.9])

  const features = [
    {
      title: "Responsive Design",
      description: "Fully responsive layouts that work on any device, from mobile to desktop.",
      icon: "layout",
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Modern Animations",
      description: "Smooth, performant animations that enhance the user experience.",
      icon: "wand",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "SEO Optimized",
      description: "Built with best practices for search engine optimization.",
      icon: "search",
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Fast Performance",
      description: "Optimized for speed and performance to keep users engaged.",
      icon: "zap",
      color: "from-amber-500 to-yellow-500",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-50 text-zinc-900">
      <AnimatedCursor />

      {/* Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 font-bold text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600"></div>
            Animated
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {["Home", "Features", "About", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-zinc-600 hover:text-zinc-900 transition-colors relative group"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                Get Started
              </Button>
            </motion.div>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-zinc-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: mobileMenuOpen ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {["Home", "Features", "About", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-zinc-600 hover:text-zinc-900 transition-colors py-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: mobileMenuOpen ? 0 : -20, opacity: mobileMenuOpen ? 1 : 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}

            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 w-full mt-2">
              Get Started
            </Button>
          </div>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20" ref={heroRef}>
        <motion.div className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-violet-50 to-transparent"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-300/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl"></div>
        </motion.div>

        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-block">
                <motion.span
                  className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-800 font-medium text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  ✨ Introducing our new platform
                </motion.span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <AnimatedText text="Create stunning" />
                <br />
                <AnimatedText
                  text="animated experiences"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600"
                  delay={0.3}
                />
              </h1>

              <motion.p
                className="text-zinc-600 text-lg md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Build beautiful, interactive websites with smooth animations and creative transitions that captivate
                your audience.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg px-6 py-6 h-auto group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="text-lg px-6 py-6 h-auto border-zinc-300 hover:bg-zinc-100">
                  View Demo
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 text-zinc-600"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <span>Trusted by 1000+ companies worldwide</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              style={{ scale }}
              initial={{ opacity: 0, x: 100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-200">
                <div className="h-8 bg-zinc-100 flex items-center gap-2 px-4">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-4">
                  <img
                    src={image1.src}
                    alt="Dashboard Preview" 
                    className="rounded-lg shadow-sm"
                  />
                </div>
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-zinc-200 flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Project Completed</p>
                  <p className="text-zinc-500 text-sm">Just now</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-zinc-200"
                initial={{ opacity: 0, y: -20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-violet-500"></div>
                  <p className="font-medium">Live Updates</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-400 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-sm">Scroll to explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p
              className="text-violet-600 font-medium mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              POWERFUL FEATURES
            </motion.p>

            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need to create amazing animations
            </motion.h2>

            <motion.p
              className="text-zinc-600 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our platform provides all the tools you need to create stunning animations and transitions that will
              captivate your audience and elevate your web presence.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img src={image3.src} alt="About Us" className="w-full h-auto" />
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 h-full w-full rounded-2xl border-2 border-violet-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              ></motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">10+ Years</p>
                    <p className="text-zinc-600">Of Experience</p>
                  </div>
                </div>
                <p className="text-zinc-700">
                  We've been creating stunning animations and interactive experiences for over a decade.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-violet-600 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                ABOUT US
              </motion.p>

              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                We create animations that bring your ideas to life
              </motion.h2>

              <motion.p
                className="text-zinc-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our team of expert designers and developers are passionate about creating stunning animations and
                interactive experiences that captivate audiences and drive engagement.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {[
                  "Experienced team of designers and developers",
                  "Custom solutions tailored to your needs",
                  "Cutting-edge animation techniques",
                  "Responsive and accessible designs",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-zinc-700">{item}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 mt-4">
                  Learn More About Us
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "1,000+", label: "Projects Completed" },
              { value: "50+", label: "Team Members" },
              { value: "10+", label: "Years of Experience" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-4xl md:text-5xl font-bold">{stat.value}</h3>
                <p className="text-indigo-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-violet-600 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                CONTACT US
              </motion.p>

              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Let's bring your ideas to life
              </motion.h2>

              <motion.p
                className="text-zinc-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to create stunning animations for your next project? Get in touch with our team today to discuss
                how we can help bring your vision to life.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {[
                  { label: "Email", value: "hello@animated.com" },
                  { label: "Phone", value: "+1 (555) 123-4567" },
                  { label: "Address", value: "123 Animation St, Creative City, CA 94103" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-zinc-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 border border-zinc-200"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
                      First Name
                    </label>
                    <Input id="first-name" placeholder="John" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
                      Last Name
                    </label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-700">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Tell us about your project..." className="min-h-[120px]" />
                </div>

                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              Ready to create amazing animations?
            </motion.h2>

            <motion.p
              className="text-lg text-zinc-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of satisfied customers who have transformed their websites with our animation platform. Get
              started today and see the difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button className="bg-white text-zinc-900 hover:bg-zinc-100 text-lg px-8 py-6 h-auto">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-800 text-zinc-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600"></div>
                Animated
              </div>
              <p className="mb-4">Creating stunning animations and interactive experiences for the modern web.</p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "github"].map((social) => (
                  <a key={social} href="#" className="text-zinc-400 hover:text-white transition-colors">
                    <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Press"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Tutorials", "Examples", "Pricing"],
              },
              {
                title: "Legal",
                links: ["Terms", "Privacy", "Cookies", "Licenses"],
              },
            ].map((column, i) => (
              <div key={i}>
                <h3 className="font-bold text-white mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Animated. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
