'use client'
import { usePlayerStore } from '@/store/playerStore'
import { useAuthModal } from '@/store/playerStore'
import { useUser } from '@/hooks/useUser'
import { useState } from 'react'

interface Artist {
  name: string
  thumbnail: string
  searchQuery: string
}

interface Props {
  artist: Artist
}

export default function ArtistCard({ artist }: Props) {
  const { setTrack } = usePlayerStore()
  const { open } = useAuthModal()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!user) { open(); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(artist.searchQuery + ' official')}&limit=10`)
      const tracks = await res.json()
      if (tracks.length > 0) setTrack(tracks[0], tracks)
    } catch {}
    setLoading(false)
  }

  return (
    <div className="flex-shrink-0 w-36 group cursor-pointer" onClick={handleClick}>
      <div className="relative mb-3">
        <div className="w-36 h-36 rounded-full overflow-hidden bg-[#2a2a2a] shadow-lg">
          <img src={artist.thumbnail} alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        {/* Play button hover */}
        <div className={`absolute bottom-2 right-2 w-10 h-10 gradient-orange rounded-full flex items-center justify-center shadow-lg transition-all duration-300
          ${loading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>
      <p className="text-sm font-bold text-white text-center truncate">{artist.name}</p>
      <p className="text-xs text-[#B3B3B3] text-center mt-0.5">Artis</p>
    </div>
  )
}