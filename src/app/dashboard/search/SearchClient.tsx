'use client'
import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { YTTrack } from '@/lib/youtube'
import TrackCard from '@/components/TrackCard'
import SkeletonCard from '@/components/SkeletonCard'
import Footer from '@/components/Footer'

const GENRES = [
  { label: '🇮🇩 Pop Indo', keyword: 'lagu pop indonesia terbaru' },
  { label: '🎸 Indie Indo', keyword: 'lagu indie indonesia' },
  { label: '🌙 Slow Rock', keyword: 'slow rock indonesia' },
  { label: '⚡ K-Pop', keyword: 'kpop terbaru' },
  { label: '🌊 Lo-fi', keyword: 'lofi beats chill' },
  { label: '🎹 Jazz', keyword: 'jazz instrumental' },
  { label: '🔥 Hip-Hop', keyword: 'hip hop indonesia' },
  { label: '🌿 Acoustic', keyword: 'acoustic cover indonesia' },
]

export default function SearchClient() {
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q')

  const [query, setQuery] = useState(urlQuery ?? '')
  const [results, setResults] = useState<YTTrack[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTag, setActiveTag] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = useCallback(async (q: string) => {
    if (!q.trim()) return
    setLoading(true)
    setActiveTag('')
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      })
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    }
    setLoading(false)
  }, [])

  const handleGenre = useCallback(async (keyword: string, label: string) => {
    setLoading(true)
    setActiveTag(label)
    setQuery('')
    setSearched(true)
    try {
      const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`, {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      })
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error('Genre fetch error:', error)
      setResults([])
    }
    setLoading(false)
  }, [])

  // Auto-search kalau ada query dari URL (dari header search bar)
  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery)
      handleSearch(urlQuery)
    }
  }, [urlQuery, handleSearch])

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-black text-white mb-6">🔍 Cari Lagu</h2>

      {/* Search Input */}
      <div className="flex gap-3 mb-6">
        <input type="text" value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
          placeholder="Cari judul lagu, artis, album..."
          className="flex-1 bg-[#212121] border border-[#333] focus:border-[#FF8A00] rounded-xl px-5 py-3 text-white text-sm outline-none transition-colors placeholder-[#B3B3B3]" />
        <button onClick={() => handleSearch(query)} disabled={loading || !query.trim()}
          className="gradient-orange hover:opacity-90 disabled:opacity-40 text-white px-6 py-3 rounded-full text-sm font-bold transition-opacity flex-shrink-0">
          Cari
        </button>
      </div>

      {/* Genre Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {GENRES.map(g => (
          <button key={g.label} onClick={() => handleGenre(g.keyword, g.label)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border
              ${activeTag === g.label
                ? 'gradient-orange border-transparent text-white'
                : 'bg-[#212121] border-[#333] text-[#B3B3B3] hover:text-white hover:border-[#555]'}`}>
            {g.label}
          </button>
        ))}
      </div>

      {/* Skeleton saat loading */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && searched && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-[#B3B3B3]">Tidak ditemukan. Coba kata kunci lain.</p>
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <>
          <p className="text-xs text-[#B3B3B3] mb-4">{results.length} hasil ditemukan</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map(track => (
              <TrackCard key={track.id} track={track} allTracks={results} />
            ))}
          </div>
        </>
      )}

      {/* Initial state */}
      {!searched && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🎵</p>
          <p className="text-[#B3B3B3]">Ketik nama lagu atau pilih genre di atas</p>
        </div>
      )}

      <Footer />
    </div>
  )
}