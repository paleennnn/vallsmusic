import { NextResponse } from 'next/server'
import { searchYouTube, getByKeyword } from '@/lib/youtube'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const keyword = searchParams.get('keyword')

  try {
    if (query) {
      const results = await searchYouTube(query, 20)
      return NextResponse.json(results)
    }
    if (keyword) {
      const results = await getByKeyword(keyword, 20)
      return NextResponse.json(results)
    }
    return NextResponse.json([])
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}