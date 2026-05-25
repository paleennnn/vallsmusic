import { getTrendingMusic, getByKeyword } from '@/lib/youtube'
import TrackGrid from '@/components/TrackGrid'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardContent() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const name = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Kamu'

  const [trending, pop, indie] = await Promise.all([
    getTrendingMusic(8),
    getByKeyword('lagu pop indonesia 2024', 8),
    getByKeyword('lagu indie indonesia', 8),
  ])

  return (
    <>
      <h2 className="text-2xl font-black text-white mb-1">
        Selamat datang, {name} 👋
      </h2>
      <p className="text-[#B3B3B3] text-sm mb-8">Apa yang mau didengar hari ini?</p>
      <TrackGrid title="🔥 Trending Indonesia" tracks={trending} />
      <TrackGrid title="🎵 Pop Indonesia" tracks={pop} />
      <TrackGrid title="🎸 Indie Indonesia" tracks={indie} />
    </>
  )
}