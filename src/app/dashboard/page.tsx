import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import DashboardContent from './DashboardContent'
import ArtistRow from '@/components/ArtistRow'
import RecentlyPlayed from '@/components/RecentlyPlayed'
import SkeletonGrid from '@/components/SkeletonGrid'
import Footer from '@/components/Footer'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const name = user?.user_metadata?.display_name
    || user?.user_metadata?.full_name
    || user?.email?.split('@')[0]
    || 'Kamu'

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-black text-white mb-1">
        Selamat datang, {name} 👋
      </h2>
      <p className="text-[#B3B3B3] text-sm mb-8">Apa yang mau didengar hari ini?</p>

      {/* 1. Artis Populer */}
      <ArtistRow />

      {/* 2. Baru Saja Didengarkan (client, hanya logged in) */}
      <RecentlyPlayed />

      {/* 3. Trending + Pop */}
      <Suspense fallback={
        <div>
          <SkeletonGrid title="Trending Indonesia" count={8} />
          <SkeletonGrid title="Pop Indonesia" count={8} />
        </div>
      }>
        <DashboardContent />
      </Suspense>

      <Footer />
    </div>
  )
}