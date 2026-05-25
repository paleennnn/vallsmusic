import { createClient } from '@/lib/supabase/client'
import { YTTrack } from '@/lib/youtube'

export async function addToRecentlyPlayed(track: YTTrack) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Hapus kalau sudah ada (supaya tidak duplikat)
  await supabase
    .from('recently_played')
    .delete()
    .eq('user_id', user.id)
    .eq('youtube_id', track.id)

  // Insert baru di atas
  await supabase.from('recently_played').insert({
    user_id: user.id,
    youtube_id: track.id,
    title: track.title,
    channel_title: track.channelTitle,
    thumbnail: track.thumbnail,
    duration: track.duration,
    played_at: new Date().toISOString(),
  })

  // Batasi max 20 riwayat per user
  const { data } = await supabase
    .from('recently_played')
    .select('id')
    .eq('user_id', user.id)
    .order('played_at', { ascending: false })

  if (data && data.length > 20) {
    const toDelete = data.slice(20).map(r => r.id)
    await supabase.from('recently_played').delete().in('id', toDelete)
  }
}

export async function getRecentlyPlayed() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('recently_played')
    .select('*')
    .eq('user_id', user.id)
    .order('played_at', { ascending: false })
    .limit(8)

  return (data ?? []).map(r => ({
    id: r.youtube_id,
    title: r.title,
    channelTitle: r.channel_title,
    thumbnail: r.thumbnail,
    duration: r.duration,
  }))
}