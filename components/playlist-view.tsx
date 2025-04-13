"use client"

import { motion } from "framer-motion"
import { Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface Track {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  cover: string
  color: string
}

interface PlaylistViewProps {
  tracks: Track[]
  currentTrackIndex: number
  onSelectTrack: (index: number) => void
}

export default function PlaylistView({ tracks, currentTrackIndex, onSelectTrack }: PlaylistViewProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/10">
      <h3 className="text-white font-medium mb-2 px-2">Up Next</h3>
      <div className="space-y-1 max-h-[180px] overflow-y-auto custom-scrollbar">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all",
              index === currentTrackIndex ? "bg-white/20" : "hover:bg-white/10",
            )}
            onClick={() => onSelectTrack(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={track.cover || "/placeholder.svg"}
                alt={track.title}
                className="h-full w-full object-cover"
                crossOrigin="anonymous"
              />
              {index === currentTrackIndex && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Pause className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm font-medium truncate",
                  index === currentTrackIndex ? "text-white" : "text-white/90",
                )}
              >
                {track.title}
              </p>
              <p className="text-xs text-white/60 truncate">{track.artist}</p>
            </div>

            <span className="text-xs text-white/60">{track.duration}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
