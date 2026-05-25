'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { usePlaylists } from '@/hooks/usePlaylists'
import { useAuthModal } from '@/store/playerStore'
import { useUser } from '@/hooks/useUser'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const { playlists, createPlaylist } = usePlaylists()
  const { open } = useAuthModal()
  const { user } = useUser()
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')

  async function handleCreate() {
    if (!newName.trim()) return
    const playlist = await createPlaylist(newName.trim())
    setNewName('')
    setCreating(false)
    if (playlist) router.push(`/dashboard/playlist/${playlist.id}`)
  }

  function handleProtected(cb: () => void) {
    if (!user) { open(); return }
    cb()
  }

  const navItems = [
    {
      href: '/dashboard', label: 'Beranda', icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z" />
        </svg>
      )
    },
    {
      href: '/dashboard/search', label: 'Jelajahi', icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={11} cy={11} r={8} />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
      )
    },
  ]

  return (
    <aside className="hidden md:flex w-60 flex-col bg-black flex-shrink-0 h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5">
        <img src="/icons/android-chrome-192x192.png" alt="VallsMusic" className="w-9 h-9 rounded-xl" />
        <span className="font-black text-lg tracking-tight">
          <span className="text-white">Valls</span>
          <span className="gradient-orange-text">Music</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="px-3 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                ${active ? 'text-white' : 'text-[#B3B3B3] hover:text-white'}`}>
              <span className={active ? 'text-[#FF8A00]' : ''}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Library */}
      <div className="mt-4 mx-3 bg-[#212121] rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3 text-[#B3B3B3]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
            <span className="text-sm font-bold">Koleksi</span>
          </div>
          <button
            onClick={() => handleProtected(() => setCreating(true))}
            className="text-[#B3B3B3] hover:text-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {creating && (
          <div className="px-3 pb-2 flex gap-2">
            <input autoFocus value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setCreating(false) }}
              placeholder="Nama playlist..."
              className="flex-1 bg-[#2a2a2a] border border-[#FF8A00] rounded-lg px-3 py-1.5 text-xs text-white outline-none" />
            <button onClick={handleCreate}
              className="text-xs gradient-orange text-white px-3 rounded-lg font-bold">OK</button>
          </div>
        )}

        {/* Favorites shortcut */}
        <button
          onClick={() => handleProtected(() => router.push('/dashboard/favorites'))}
          className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-colors text-left
            ${pathname === '/dashboard/favorites' ? 'bg-[#2a2a2a]' : 'hover:bg-[#2a2a2a]'}`}>
          <div className="w-10 h-10 rounded-md gradient-orange flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Lagu Favorit</p>
            <p className="text-xs text-[#B3B3B3]">Playlist</p>
          </div>
        </button>

        {/* Playlists */}
        <div className="flex-1 overflow-y-auto px-2 pb-3 mt-1 space-y-1">
          {playlists.map(pl => (
            <Link key={pl.id} href={`/dashboard/playlist/${pl.id}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${pathname === `/dashboard/playlist/${pl.id}` ? 'bg-[#2a2a2a]' : 'hover:bg-[#2a2a2a]'}`}>
              <div className="w-10 h-10 bg-[#2a2a2a] rounded-md flex items-center justify-center text-xl flex-shrink-0">
                {pl.cover_emoji}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{pl.name}</p>
                <p className="text-xs text-[#B3B3B3]">Playlist</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}