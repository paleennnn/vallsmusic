'use client'
import { YTTrack } from '@/lib/youtube'
import { usePlayerStore } from '@/store/playerStore'
import { useFavorites } from '@/hooks/useFavorites'
import { usePlaylists } from '@/hooks/usePlaylists'
import { useAuthModal } from '@/store/playerStore'
import { useUser } from '@/hooks/useUser'
import { useState } from 'react'

interface Props {
  track: YTTrack
  allTracks: YTTrack[]
}

export default function TrackCard({ track, allTracks }: Props) {
  const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { playlists, addTrackToPlaylist } = usePlaylists()
  const { open } = useAuthModal()
  const { user } = useUser()
  const [showMenu, setShowMenu] = useState(false)
  const [toast, setToast] = useState('')

  const isActive = currentTrack?.id === track.id
  const faved = isFavorite(track.id)

  function handlePlay(e: React.MouseEvent) {
    e.stopPropagation()
    if (!user) { open(); return }
    if (isActive) togglePlay()
    else setTrack(track, allTracks)
  }

  async function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation()
    if (!user) { open(); return }
    await toggleFavorite(track)
    showToastMsg(faved ? 'Dihapus dari favorit' : 'Ditambah ke favorit ❤️')
  }

  async function handleAddToPlaylist(playlistId: string) {
    setShowMenu(false)
    const { error } = await addTrackToPlaylist(playlistId, track)
    showToastMsg(error ?? 'Ditambahkan ke playlist ✅')
  }

  function showToastMsg(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  return (
    <div className={`flex-shrink-0 w-44 group relative cursor-pointer`}>
      {/* Toast */}
      {toast && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#242433] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-20 border border-[#3a3a3a]">
          {toast}
        </div>
      )}

      {/* Cover Art */}
      <div className="relative mb-3 w-44 h-44 rounded-xl overflow-hidden bg-[#2a2a2a] shadow-md"
        onClick={handlePlay}>
        <img src={track.thumbnail} alt={track.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

        {/* Play button */}
        <div className={`absolute bottom-3 right-3 w-11 h-11 gradient-orange rounded-full flex items-center justify-center shadow-xl transition-all duration-300
          ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
          {isActive && isPlaying ? (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Playing indicator */}
        {isActive && (
          <div className="absolute top-2 left-2 flex items-end gap-0.5 h-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-0.5 bg-[#FF8A00] rounded-full animate-pulse"
                style={{ height: `${[12, 16, 10][i-1]}px`, animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-1">
        <p className={`text-sm font-semibold truncate ${isActive ? 'text-[#FF8A00]' : 'text-white'}`}>
          {track.title}
        </p>
        <p className="text-xs text-[#B3B3B3] truncate mt-0.5">{track.channelTitle}</p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[#555]">{track.duration}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handleFavorite}
              className={`p-1 rounded-full transition-colors ${faved ? 'text-[#FF8A00]' : 'text-[#B3B3B3] hover:text-white'}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill={faved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="relative">
              <button onClick={e => { e.stopPropagation(); setShowMenu(v => !v) }}
                className="p-1 text-[#B3B3B3] hover:text-white transition-colors rounded-full">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                </svg>
              </button>
              {showMenu && (
                <div className="absolute bottom-6 right-0 bg-[#282828] border border-[#3a3a3a] rounded-xl p-2 z-10 min-w-44 shadow-2xl">
                  <p className="text-xs text-[#B3B3B3] px-2 pb-1 border-b border-[#3a3a3a] mb-1">Tambah ke playlist</p>
                  {playlists.length === 0
                    ? <p className="text-xs text-[#B3B3B3] px-2 py-1.5">Belum ada playlist</p>
                    : playlists.map(pl => (
                      <button key={pl.id} onClick={() => handleAddToPlaylist(pl.id)}
                        className="w-full text-left text-xs text-white hover:bg-[#3a3a3a] px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2">
                        <span>{pl.cover_emoji}</span>{pl.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}