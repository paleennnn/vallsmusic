import { getTrendingMusic, getByKeyword } from '@/lib/youtube'
import TrackGrid from '@/components/TrackGrid'

export default async function DashboardContent() {
  const [trending, pop] = await Promise.all([
    getTrendingMusic(12),
    getByKeyword('lagu pop indonesia 2024', 12),
  ])

  return (
    <>
      <TrackGrid title="Trending Indonesia" tracks={trending} />
      <TrackGrid title="Pop Indonesia" tracks={pop} />
    </>
  )
}