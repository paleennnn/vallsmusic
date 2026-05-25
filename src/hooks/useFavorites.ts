import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { YTTrack } from '@/lib/youtube'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const supabase = createClient()

  useEffect(() => {
    fetchFavorites()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchFavorites() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('favorites')
      .select('jamendo_track_id')
      .eq('user_id', user.id)
    setFavorites(data?.map(f => f.jamendo_track_id) ?? [])
  }

  async function toggleFavorite(track: YTTrack) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const isFav = favorites.includes(track.id)
    if (isFav) {
      await supabase.from('favorites').delete()
        .eq('user_id', user.id).eq('jamendo_track_id', track.id)
      setFavorites(prev => prev.filter(id => id !== track.id))
    } else {
      // Convert duration string "3:45" to seconds number
      const [m, s] = track.duration.split(':').map(Number);
      const durationSec = track.duration.split(':').length === 3 
        ? Number(track.duration.split(':')[0]) * 3600 + Number(track.duration.split(':')[1]) * 60 + Number(track.duration.split(':')[2])
        : (m || 0) * 60 + (s || 0);

      await supabase.from('favorites').insert({
        user_id: user.id,
        jamendo_track_id: track.id,
        track_name: track.title,
        artist_name: track.channelTitle,
        cover_url: track.thumbnail,
        audio_url: `https://www.youtube.com/watch?v=${track.id}`,
        duration: durationSec,
      })
      setFavorites(prev => [...prev, track.id])
    }
  }

  return { favorites, toggleFavorite, isFavorite: (id: string) => favorites.includes(id) }
}