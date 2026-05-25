const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

// Untuk fungsi yang dipanggil dari Server Component
const SERVER_API_KEY = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!

export interface YTTrack {
  id: string
  title: string
  channelTitle: string
  thumbnail: string
  duration: string // format: "3:45"
}

// Search lagu
export async function searchYouTube(query: string, maxResults = 20, apiKey = API_KEY): Promise<YTTrack[]> {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`,
    { next: { revalidate: 60 } }
  )
  const data = await res.json()
  if (!data.items) return []

  const videoIds = data.items.map((item: any) => item.id.videoId).join(',')
  return formatItems(data.items, await getDurations(videoIds, apiKey))
}

// Trending musik Indonesia
export async function getTrendingMusic(maxResults = 20): Promise<YTTrack[]> {
  const res = await fetch(
    `${BASE_URL}/videos?part=snippet,contentDetails&chart=mostPopular&videoCategoryId=10&regionCode=ID&maxResults=${maxResults}&key=${SERVER_API_KEY}`,
    { next: { revalidate: 43200 } }
  )
  const data = await res.json()
  if (!data.items) return []

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.medium?.url ?? '',
    duration: parseDuration(item.contentDetails?.duration ?? ''),
  }))
}

// Search by keyword/genre
export async function getByKeyword(keyword: string, maxResults = 20): Promise<YTTrack[]> {
  return searchYouTube(`${keyword} music`, maxResults, SERVER_API_KEY)
}

// Ambil durasi video dari videoIds (comma separated)
async function getDurations(videoIds: string, apiKey = API_KEY): Promise<Record<string, string>> {
  if (!videoIds) return {}
  const res = await fetch(
    `${BASE_URL}/videos?part=contentDetails&id=${videoIds}&key=${apiKey}`
  )
  const data = await res.json()
  const map: Record<string, string> = {}
  data.items?.forEach((item: any) => {
    map[item.id] = parseDuration(item.contentDetails?.duration ?? '')
  })
  return map
}

function formatItems(items: any[], durations: Record<string, string>): YTTrack[] {
  return items
    .filter((item: any) => item.id?.videoId)
    .map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.medium?.url ?? '',
      duration: durations[item.id.videoId] ?? '0:00',
    }))
}

// Convert ISO 8601 duration (PT3M45S) → "3:45"
export function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '0:00'
  const h = parseInt(match[1] ?? '0')
  const m = parseInt(match[2] ?? '0')
  const s = parseInt(match[3] ?? '0')
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Convert ISO 8601 duration (PT3M45S) → total seconds
export function durationToSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const h = parseInt(match[1] ?? '0')
  const m = parseInt(match[2] ?? '0')
  const s = parseInt(match[3] ?? '0')
  return h * 3600 + m * 60 + s
}

export function formatSeconds(s: number): string {
  if (!s) return '0:00'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  return `${m}:${sec.toString().padStart(2, '0')}`
}