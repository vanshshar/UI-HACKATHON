"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Heart,
  ListMusic,
  MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import AlbumVisualizer from "@/components/album-visualizer"
import PlaylistView from "@/components/playlist-view"

// Sample data
const tracks = [
  {
    id: 1,
    title: "Midnight Serenade",
    artist: "Luna Eclipse",
    album: "Cosmic Journey",
    duration: "3:45",
    cover: "/placeholder.svg?height=500&width=500",
    color: "from-purple-500 to-blue-500",
  },
  {
    id: 2,
    title: "Electric Dreams",
    artist: "Neon Pulse",
    album: "Synthetic Emotions",
    duration: "4:12",
    cover: "/placeholder.svg?height=500&width=500",
    color: "from-pink-500 to-orange-500",
  },
  {
    id: 3,
    title: "Ocean Whispers",
    artist: "Aqua Mirage",
    album: "Deep Blue",
    duration: "3:28",
    cover: "/placeholder.svg?height=500&width=500",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    title: "Urban Jungle",
    artist: "Metro Beats",
    album: "City Lights",
    duration: "5:02",
    cover: "/placeholder.svg?height=500&width=500",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "Desert Mirage",
    artist: "Sahara Sounds",
    album: "Golden Sands",
    duration: "4:37",
    cover: "/placeholder.svg?height=500&width=500",
    color: "from-amber-500 to-yellow-500",
  },
]

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [liked, setLiked] = useState(false)
  const isMobile = useMobile()

  const currentTrack = tracks[currentTrackIndex]

  // Simulate progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext()
            return 0
          }
          return prev + 0.5
        })
      }, 500)
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))
    setProgress(0)
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1))
    setProgress(0)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (duration: string, progress: number) => {
    const [minutes, seconds] = duration.split(":").map(Number)
    const totalSeconds = minutes * 60 + seconds
    const currentSeconds = Math.floor(totalSeconds * (progress / 100))
    const currentMinutes = Math.floor(currentSeconds / 60)
    const remainingSeconds = currentSeconds % 60
    return `${currentMinutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full max-w-3xl">
      <div
        className={cn(
          "relative rounded-3xl overflow-hidden backdrop-blur-xl bg-black/30 border border-white/10 shadow-xl transition-all duration-500",
          showPlaylist ? "h-[700px]" : "h-[600px]",
        )}
      >
        {/* Background gradient based on current track */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-20 blur-xl transition-all duration-1000",
            currentTrack.color,
          )}
        />

        <div className="relative z-10 flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/10"
              onClick={() => setShowPlaylist(!showPlaylist)}
            >
              <ListMusic className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-white">Now Playing</h1>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>

          {/* Album Visualizer */}
          <AlbumVisualizer cover={currentTrack.cover} isPlaying={isPlaying} color={currentTrack.color} />

          {/* Track Info */}
          <div className="text-center mt-8 mb-4">
            <h2 className="text-2xl font-bold text-white mb-1">{currentTrack.title}</h2>
            <p className="text-white/70">
              {currentTrack.artist} • {currentTrack.album}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/20 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-white"
              onValueChange={(value) => setProgress(value[0])}
            />
            <div className="flex justify-between text-xs text-white/70 mt-1">
              <span>{formatTime(currentTrack.duration, progress)}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full text-white hover:bg-white/10 transition-all",
                liked ? "text-rose-500" : "text-white",
              )}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={cn("h-6 w-6", liked && "fill-rose-500")} />
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10 h-12 w-12"
                onClick={handlePrevious}
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white text-black hover:bg-white/90 h-16 w-16 flex items-center justify-center"
                onClick={handlePlayPause}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isPlaying ? "pause" : "play"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                  </motion.div>
                </AnimatePresence>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white hover:bg-white/10 h-12 w-12"
                onClick={handleNext}
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
              <Shuffle className="h-6 w-6" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-white/10 h-8 w-8"
              onClick={toggleMute}
            >
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              className="w-28 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/20 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border [&_[role=slider]]:border-white [&>span:first-child_span]:bg-white"
              onValueChange={handleVolumeChange}
            />
          </div>

          {/* Playlist */}
          <AnimatePresence>
            {showPlaylist && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                <PlaylistView
                  tracks={tracks}
                  currentTrackIndex={currentTrackIndex}
                  onSelectTrack={(index) => {
                    setCurrentTrackIndex(index)
                    setProgress(0)
                    setIsPlaying(true)
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
