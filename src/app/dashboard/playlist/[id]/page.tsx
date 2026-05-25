import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PlaylistClient from './PlaylistClient'

export default async function PlaylistPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: playlist } = await supabase
    .from('playlists')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user!.id)
    .single()

  if (!playlist) notFound()

  const { data: tracks } = await supabase
    .from('playlist_tracks')
    .select('*')
    .eq('playlist_id', params.id)
    .order('added_at', { ascending: true })

  return <PlaylistClient playlist={playlist} initialTracks={tracks ?? []} />
}