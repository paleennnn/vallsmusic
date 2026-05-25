'use client'
import { useEffect, useState } from 'react'
import { usePlayerStore, useAuthModal } from '@/store/playerStore'
import { createClient } from '@/lib/supabase/client'
import { useFavorites } from '@/hooks/useFavorites'
import { useUser } from '@/hooks/useUser'

export default function PlayerBar() {
  const {
    currentTrack, isPlaying, volume,
    isShuffle, isRepeat, togglePlay, nextTrack, prevTrack,
    setVolume, toggleShuffle, toggleRepeat
  } = usePlayerStore()
  const { open } = useAuthModal()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { user } = useUser()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    const interval = setInterval(() => {
      const player = (window as any).__ytPlayer
      if (!player) return
      try {
        setCurrentTime(player.getCurrentTime?.() ?? 0)
        setDuration(player.getDuration?.() ?? 0)
      } catch {}
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    const player = (window as any).__ytPlayer
    if (player && duration) {
      player.seekTo(pct * duration, true)
      setCurrentTime(pct * duration)
    }
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  function handlePlay() {
    if (!user) { open(); return }
    togglePlay()
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const faved = currentTrack ? isFavorite(currentTrack.id) : false

  return (
    <div className="h-[90px] bg-[#181818] border-t border-[#282828] flex items-center px-4 gap-4 flex-shrink-0">

      {/* Now Playing */}
      <div className="flex items-center gap-3 w-[30%] min-w-0">
        {currentTrack ? (
          <>
            <img src={currentTrack.thumbnail} alt={currentTrack.title}
              className="w-14 h-14 rounded-md object-cover flex-shrink-0" />
            <div className="min-w-0 hidden sm:block">
              <p className="text-sm font-medium text-white truncate">{currentTrack.title}</p>
              <p className="text-xs text-[#B3B3B3] truncate">{currentTrack.channelTitle}</p>
            </div>
            {user && (
              <button onClick={() => toggleFavorite(currentTrack)}
                className={`flex-shrink-0 hidden sm:block transition-colors ${faved ? 'text-[#FF8A00]' : 'text-[#B3B3B3] hover:text-white'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill={faved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <div className="hidden sm:block">
            <p className="text-sm text-[#B3B3B3]">Pilih lagu untuk diputar</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-2 max-w-[40%]">
        <div className="flex items-center gap-4">
          {/* Shuffle */}
          <button onClick={toggleShuffle}
            className={`transition-colors hidden sm:block ${isShuffle ? 'text-[#FF8A00]' : 'text-[#B3B3B3] hover:text-white'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
            </svg>
          </button>

          {/* Prev */}
          <button onClick={prevTrack} className="text-[#B3B3B3] hover:text-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button onClick={handlePlay}
            className="w-9 h-9 rounded-full gradient-orange flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0">
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

          {/* Next */}
          <button onClick={nextTrack} className="text-[#B3B3B3] hover:text-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
            </svg>
          </button>

          {/* Repeat */}
          <button onClick={toggleRepeat}
            className={`transition-colors hidden sm:block ${isRepeat ? 'text-[#FF8A00]' : 'text-[#B3B3B3] hover:text-white'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-[#B3B3B3] w-8 text-right flex-shrink-0">{fmt(currentTime)}</span>
          <div className="flex-1 h-1 bg-[#4d4d4d] rounded-full cursor-pointer group" onClick={seek}>
            <div className="h-full rounded-full relative transition-all"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FFA629, #FF8A00)' }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-xs text-[#B3B3B3] w-8 flex-shrink-0">{fmt(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden md:flex items-center gap-2 w-[30%] justify-end">
        <svg className="w-4 h-4 text-[#B3B3B3] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
        <div className="w-24 h-1 bg-[#4d4d4d] rounded-full cursor-pointer group"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            setVolume(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)))
          }}>
          <div className="h-full rounded-full relative"
            style={{ width: `${volume * 100}%`, background: 'linear-gradient(90deg, #FFA629, #FF8A00)' }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  )
}