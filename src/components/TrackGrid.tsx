'use client'
import { YTTrack } from '@/lib/youtube'
import TrackCard from './TrackCard'
import ScrollRow from './ScrollRow'

interface Props {
  title: string
  tracks: YTTrack[]
}

export default function TrackGrid({ title, tracks }: Props) {
  return (
    <ScrollRow title={title}>
      {tracks.map(track => (
        <TrackCard key={track.id} track={track} allTracks={tracks} />
      ))}
    </ScrollRow>
  )
}