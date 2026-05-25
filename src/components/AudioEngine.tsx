'use client'
import { useEffect, useRef } from 'react'
import { usePlayerStore } from '@/store/playerStore'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
    __ytPlayer: any
  }
}

export default function AudioEngine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const readyRef = useRef(false)

  const currentTrack = usePlayerStore(s => s.currentTrack)
  const isPlaying = usePlayerStore(s => s.isPlaying)
  const volume = usePlayerStore(s => s.volume)
  const isRepeat = usePlayerStore(s => s.isRepeat)
  const setPlaying = usePlayerStore(s => s.setPlaying)
  const nextTrack = usePlayerStore(s => s.nextTrack)

  // Load YouTube IFrame API sekali
  useEffect(() => {
    if (document.getElementById('yt-iframe-api')) {
      if (window.YT?.Player) initPlayer()
      return
    }
    const tag = document.createElement('script')
    tag.id = 'yt-iframe-api'
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => initPlayer()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function initPlayer() {
    if (readyRef.current || !containerRef.current) return
    readyRef.current = true

    const player = new window.YT.Player(containerRef.current, {
      height: '1',
      width: '1',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          playerRef.current = player
          window.__ytPlayer = player
          player.setVolume(Math.round(usePlayerStore.getState().volume * 100))
        },
        onStateChange: (e: any) => {
          if (e.data === window.YT.PlayerState.PLAYING) setPlaying(true)
          if (e.data === window.YT.PlayerState.PAUSED) setPlaying(false)
          if (e.data === window.YT.PlayerState.ENDED) {
            if (usePlayerStore.getState().isRepeat) {
              player.seekTo(0)
              player.playVideo()
            } else {
              usePlayerStore.getState().nextTrack()
            }
          }
        },
      },
    })
  }

  // Ganti track
  useEffect(() => {
    if (!currentTrack) return
    const tryLoad = (attempt = 0) => {
      const player = window.__ytPlayer
      if (!player) {
        if (attempt < 20) setTimeout(() => tryLoad(attempt + 1), 300)
        return
      }
      try {
        player.loadVideoById(currentTrack.id)
        player.setVolume(Math.round(usePlayerStore.getState().volume * 100))
      } catch {
        if (attempt < 20) setTimeout(() => tryLoad(attempt + 1), 300)
      }
    }
    tryLoad()
  }, [currentTrack?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Play / Pause
  useEffect(() => {
    const player = window.__ytPlayer
    if (!player) return
    try {
      if (isPlaying) player.playVideo()
      else player.pauseVideo()
    } catch {}
  }, [isPlaying])

  // Volume
  useEffect(() => {
    try { window.__ytPlayer?.setVolume(Math.round(volume * 100)) } catch {}
  }, [volume])

  // Media Session API
  useEffect(() => {
    if (!currentTrack || !('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.channelTitle,
      artwork: [{ src: currentTrack.thumbnail, sizes: '320x180', type: 'image/jpeg' }]
    })
    navigator.mediaSession.setActionHandler('play', () => setPlaying(true))
    navigator.mediaSession.setActionHandler('pause', () => setPlaying(false))
    navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack())
    navigator.mediaSession.setActionHandler('previoustrack', () => usePlayerStore.getState().prevTrack())
  }, [currentTrack]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div 
      id="youtube-player-container"
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.01
      }}
    >
      <div ref={containerRef} />
    </div>
  )
}