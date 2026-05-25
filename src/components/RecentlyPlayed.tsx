'use client'
import { useEffect, useState } from 'react'
import { getRecentlyPlayed } from '@/hooks/useRecentlyPlayed'
import { YTTrack } from '@/lib/youtube'
import TrackCard from './TrackCard'
import ScrollRow from './ScrollRow'
import { useUser } from '@/hooks/useUser'

export default function RecentlyPlayed() {
  const [tracks, setTracks] = useState<YTTrack[]>([])
  const { user } = useUser()

  useEffect(() => {
    if (!user) return
    getRecentlyPlayed().then(data => setTracks(data as YTTrack[]))
  }, [user])

  if (!user || tracks.length === 0) return null

  return (
    <ScrollRow title="Baru Diputar">
      {tracks.map(track => (
        <TrackCard key={track.id} track={track} allTracks={tracks} />
      ))}
    </ScrollRow>
  )
}