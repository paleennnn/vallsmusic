import { Suspense } from 'react'
import SearchClient from './SearchClient'

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#B3B3B3]">Loading...</div>}>
      <SearchClient />
    </Suspense>
  )
}