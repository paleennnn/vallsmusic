'use client'
import { useState, useEffect } from 'react'
import { usePlayerStore, useAuthModal } from '@/store/playerStore'
import { useUser } from '@/hooks/useUser'

export default function MiniPlayer() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const currentTrack = usePlayerStore(s => s.currentTrack)
  const isPlaying = usePlayerStore(s => s.isPlaying)
  const togglePlay = usePlayerStore(s => s.togglePlay)
  const nextTrack = usePlayerStore(s => s.nextTrack)
  const { open } = useAuthModal()
  const { user } = useUser()

  if (!mounted || !currentTrack) return null

  function handlePlay() {
    if (!user) { open(); return }
    togglePlay()
  }

  return (
    <div className="bg-[#212121] border-t border-white/10 px-4 py-2 flex items-center gap-3 shadow-[0_-8px_30px_rgb(0,0,0,0.5)] w-full h-[64px] relative z-[101]">
      <div className="relative w-11 h-11 flex-shrink-0 animate-pulse-slow">
        {currentTrack.thumbnail ? (
          <img src={currentTrack.thumbnail} alt={currentTrack.title}
            className="w-full h-full rounded-lg object-cover" />
        ) : (
          <div className="w-full h-full bg-[#282828] rounded-lg" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate leading-tight">{currentTrack.title}</p>
        <p className="text-xs text-[#B3B3B3] truncate mt-0.5">{currentTrack.channelTitle}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={handlePlay}
          className="w-9 h-9 rounded-full gradient-orange flex items-center justify-center hover:opacity-90 transition-opacity">
          {isPlaying ? (
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button onClick={nextTrack} className="text-[#B3B3B3] hover:text-white transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}