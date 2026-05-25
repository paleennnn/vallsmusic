'use client'
import { YTTrack } from '@/lib/youtube'
import TrackCard from './TrackCard'

interface Props {
  title: string
  tracks: YTTrack[]
}

export default function TrackGrid({ title, tracks }: Props) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tracks.map(track => (
          <TrackCard key={track.id} track={track} allTracks={tracks} />
        ))}
      </div>
    </div>
  )
}