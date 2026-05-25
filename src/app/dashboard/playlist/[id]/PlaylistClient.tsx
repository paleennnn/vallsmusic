'use client'
'use client'
import { usePlayerStore } from '@/store/playerStore'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { YTTrack, formatSeconds } from '@/lib/youtube'
import Footer from '@/components/Footer'

interface Playlist { id: string; name: string; cover_emoji: string; description: string | null }
interface TrackRow {
  id: string; jamendo_track_id: string; track_name: string
  artist_name: string; cover_url: string; audio_url: string; duration: number
}

export default function PlaylistClient({ playlist, initialTracks }: { playlist: Playlist; initialTracks: TrackRow[] }) {
  const [tracks, setTracks] = useState(initialTracks)
  const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore()
  const supabase = createClient()
  const router = useRouter()

  const ytTracks: YTTrack[] = tracks.map(t => ({
    id: t.jamendo_track_id,
    title: t.track_name,
    channelTitle: t.artist_name,
    thumbnail: t.cover_url,
    duration: formatSeconds(t.duration),
  }))

  async function removeTrack(trackId: string) {
    await supabase.from('playlist_tracks').delete().eq('id', trackId)
    setTracks(prev => prev.filter(t => t.id !== trackId))
  }

  async function deletePlaylist() {
    if (!confirm(`Hapus playlist "${playlist.name}"?`)) return
    await supabase.from('playlists').delete().eq('id', playlist.id)
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-end gap-6 mb-8">
        <div className="w-32 h-32 bg-[#1c1c26] rounded-2xl flex items-center justify-center text-6xl flex-shrink-0">
          {playlist.cover_emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Playlist</p>
          <h2 className="text-3xl font-bold text-white mb-2 truncate">{playlist.name}</h2>
          <p className="text-zinc-500 text-sm">{tracks.length} lagu</p>
          <div className="flex gap-3 mt-4">
            {tracks.length > 0 && (
              <button onClick={() => setTrack(ytTracks[0], ytTracks)}
                className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-5 py-2 rounded-xl transition-colors">
                ▶ Putar Semua
              </button>
            )}
            <button onClick={deletePlaylist}
              className="text-zinc-500 hover:text-red-400 text-sm px-4 py-2 rounded-xl border border-[#2a2a3d] hover:border-red-400/30 transition-colors">
              🗑 Hapus Playlist
            </button>
          </div>
        </div>
      </div>

      {/* Track list */}
      {tracks.length === 0
        ? <p className="text-zinc-600 text-center py-12">Playlist masih kosong. Tambahkan lagu dari beranda!</p>
        : (
          <div className="space-y-1">
            {tracks.map((track, i) => {
              const jt = ytTracks[i]
              const isActive = currentTrack?.id === jt.id
              return (
                <div key={track.id}
                  onClick={() => isActive ? togglePlay() : setTrack(jt, ytTracks)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors group
                    ${isActive ? 'bg-[#1c1c2e]' : 'hover:bg-[#1c1c26]'}`}>
                  <span className={`w-5 text-center text-sm ${isActive ? 'text-violet-400' : 'text-zinc-600'}`}>
                    {isActive && isPlaying ? '▶' : i + 1}
                  </span>
                  <img src={track.cover_url} alt={track.track_name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isActive ? 'text-violet-400' : 'text-white'}`}>
                      {track.track_name}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">{track.artist_name}</p>
                  </div>
                  <span className="text-xs text-zinc-600">{jt.duration}</span>
                  <button
                    onClick={e => { e.stopPropagation(); removeTrack(track.id) }}
                    className="text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all text-sm">
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}
        <Footer />
    </div>
  )
}