import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { YTTrack } from '@/lib/youtube'

export interface Playlist {
  id: string
  name: string
  description: string | null
  cover_emoji: string
  created_at: string
}

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPlaylists()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchPlaylists() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setPlaylists(data ?? [])
    setLoading(false)
  }

  async function createPlaylist(name: string, emoji = '🎵') {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    const { data, error } = await supabase
      .from('playlists')
      .insert({ user_id: user.id, name, cover_emoji: emoji })
      .select()
      .single()
    if (!error && data) setPlaylists(prev => [data, ...prev])
    return data
  }

  async function deletePlaylist(playlistId: string) {
    await supabase.from('playlists').delete().eq('id', playlistId)
    setPlaylists(prev => prev.filter(p => p.id !== playlistId))
  }

  async function addTrackToPlaylist(playlistId: string, track: YTTrack) {
  const { data: existing } = await supabase
    .from('playlist_tracks')
    .select('id')
    .eq('playlist_id', playlistId)
    .eq('jamendo_track_id', track.id)
    .single()

  if (existing) return { error: 'Lagu sudah ada di playlist ini' }

  // Convert duration string "3:45" to seconds number
  const parts = track.duration.split(':').map(Number);
  const durationSec = parts.length === 3 
    ? parts[0] * 3600 + parts[1] * 60 + parts[2]
    : (parts[0] || 0) * 60 + (parts[1] || 0);

  const { error } = await supabase.from('playlist_tracks').insert({
    playlist_id: playlistId,
    jamendo_track_id: track.id,
    track_name: track.title,
    artist_name: track.channelTitle,
    cover_url: track.thumbnail,
    audio_url: `https://www.youtube.com/watch?v=${track.id}`,
    duration: durationSec,
  })
  return { error: error?.message ?? null }
}

  return { playlists, loading, createPlaylist, deletePlaylist, addTrackToPlaylist, refetch: fetchPlaylists }
}