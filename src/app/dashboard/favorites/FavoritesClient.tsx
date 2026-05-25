'use client'
import { usePlayerStore } from '@/store/playerStore'
import { useFavorites } from '@/hooks/useFavorites'
import { YTTrack, formatSeconds } from '@/lib/youtube'
import Footer from '@/components/Footer'

interface FavoriteRow {
  jamendo_track_id: string
  track_name: string
  artist_name: string
  cover_url: string
  audio_url: string
  duration: number
}

export default function FavoritesClient({ initialFavorites }: { initialFavorites: FavoriteRow[] }) {
  const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore()
  const { toggleFavorite } = useFavorites()

  // Convert DB row ke format YTTrack agar bisa diputar
  const tracks: YTTrack[] = initialFavorites.map(f => ({
    id: f.jamendo_track_id,       // ini tetap, kolomnya sama di DB
    title: f.track_name,
    channelTitle: f.artist_name,
    thumbnail: f.cover_url,
    duration: formatSeconds(f.duration),
  }))

  if (tracks.length === 0) return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-2">❤️ Favorit</h2>
      <p className="text-zinc-500 mt-8 text-center">Belum ada lagu favorit. Tambahkan dari beranda!</p>
    </div>
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">❤️ Favorit</h2>
          <p className="text-zinc-500 text-sm mt-1">{tracks.length} lagu</p>
        </div>
        <button
          onClick={() => setTrack(tracks[0], tracks)}
          className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-5 py-2.5 rounded-xl transition-colors">
          ▶ Putar Semua
        </button>
      </div>

      <div className="space-y-1">
        {tracks.map((track, i) => {
          const isActive = currentTrack?.id === track.id
          return (
            <div key={track.id}
              onClick={() => isActive ? togglePlay() : setTrack(track, tracks)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors group
                ${isActive ? 'bg-[#1c1c2e]' : 'hover:bg-[#1c1c26]'}`}>
              <span className={`w-5 text-center text-sm ${isActive ? 'text-violet-400' : 'text-zinc-600'}`}>
                {isActive && isPlaying ? '▶' : i + 1}
              </span>
              <img src={track.thumbnail} alt={track.title} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isActive ? 'text-violet-400' : 'text-white'}`}>
                  {track.title}
                </p>
                <p className="text-xs text-zinc-400 truncate">{track.channelTitle}</p>
              </div>
              <span className="text-xs text-zinc-600">{track.duration}</span>
              <button
                onClick={e => { e.stopPropagation(); toggleFavorite(track) }}
                className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity text-base">
                ❤️
              </button>
            </div>
          )
        })}
      </div>
      <Footer />
    </div>
  )
}