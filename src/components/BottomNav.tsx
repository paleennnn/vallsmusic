'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthModal } from '@/store/playerStore'
import { useUser } from '@/hooks/useUser'
import { createClient } from '@/lib/supabase/client'

export default function BottomNav() {
  const pathname = usePathname()
  const { open } = useAuthModal()
  const { user } = useUser()
  const supabase = createClient()

  const items = [
    {
      href: '/dashboard', label: 'Beranda',
      icon: (active: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z" />
        </svg>
      )
    },
    {
      href: '/dashboard/search', label: 'Jelajahi',
      icon: (active: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
          <circle cx={11} cy={11} r={8} />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
      )
    },
    {
      href: '/dashboard/favorites', label: 'Koleksi', protected: true,
      icon: (active: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      href: '/dashboard/profile', label: 'Profil', protected: true,
      icon: (active: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={12} cy={7} r={4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
  ]

  return (
    <nav className="flex items-center pb-safe">
      {items.map(item => {
        const active = pathname === item.href
        return (
          <div key={item.label} className="flex-1">
            {item.protected && !user ? (
              <button onClick={open}
                className="w-full flex flex-col items-center gap-1 py-3 text-[#B3B3B3]">
                {item.icon(false)}
                <span className="text-[10px]">{item.label}</span>
              </button>
            ) : (
              <Link href={item.href}
                className={`flex flex-col items-center gap-1 py-3 transition-colors
                  ${active ? 'text-[#FF8A00]' : 'text-[#B3B3B3] hover:text-white'}`}>
                {item.icon(active)}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}