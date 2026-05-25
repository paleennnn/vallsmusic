'use client'
import { useRef } from 'react'

interface Props {
  title: string
  children: React.ReactNode
  seeAll?: () => void
}

export default function ScrollRow({ title, children, seeAll }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    if (!rowRef.current) return
    rowRef.current.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' })
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
        <div className="flex items-center gap-2">
          {seeAll && (
            <button onClick={seeAll}
              className="text-[#B3B3B3] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
              Lihat semua
            </button>
          )}
          <button onClick={() => scroll('left')}
            className="w-7 h-7 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-full flex items-center justify-center text-white transition-colors text-sm">
            ‹
          </button>
          <button onClick={() => scroll('right')}
            className="w-7 h-7 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-full flex items-center justify-center text-white transition-colors text-sm">
            ›
          </button>
        </div>
      </div>
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {children}
      </div>
    </div>
  )
}