'use client'
import { useUser } from '@/hooks/useUser'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const { user } = useUser()
  const router = useRouter()
  const supabase = createClient()
  const [favCount, setFavCount] = useState(0)
  const [playlistCount, setPlaylistCount] = useState(0)
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    setDisplayName(user.user_metadata?.display_name ?? '')

    // Ambil jumlah favorit & playlist
    Promise.all([
      supabase.from('favorites').select('id', { count: 'exact' }).eq('user_id', user.id),
      supabase.from('playlists').select('id', { count: 'exact' }).eq('user_id', user.id),
    ]).then(([favRes, plRes]) => {
      setFavCount(favRes.count ?? 0)
      setPlaylistCount(plRes.count ?? 0)
    })
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave() {
    if (!user) return
    setSaving(true)
    await supabase.auth.updateUser({ data: { display_name: displayName } })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/dashboard')
    router.refresh()
  }

  if (!user) return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-4xl">🔒</p>
      <p className="text-[#B3B3B3]">Kamu belum login</p>
      <button onClick={() => router.push('/login')}
        className="gradient-orange text-white font-bold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
        Masuk
      </button>
    </div>
  )

  const initial = (user.user_metadata?.display_name || user.email || 'U')[0].toUpperCase()

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      {/* Header Profil */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full gradient-orange flex items-center justify-center text-4xl font-black text-white flex-shrink-0">
          {initial}
        </div>
        <div>
          <p className="text-xs text-[#B3B3B3] uppercase tracking-widest mb-1">Profil</p>
          <h1 className="text-3xl font-black text-white">
            {user.user_metadata?.display_name || 'Pengguna'}
          </h1>
          <p className="text-[#B3B3B3] text-sm mt-1">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#212121] rounded-2xl p-5 cursor-pointer hover:bg-[#2a2a2a] transition-colors"
          onClick={() => router.push('/dashboard/favorites')}>
          <p className="text-3xl font-black text-white">{favCount}</p>
          <p className="text-[#B3B3B3] text-sm mt-1">❤️ Lagu Favorit</p>
        </div>
        <div className="bg-[#212121] rounded-2xl p-5">
          <p className="text-3xl font-black text-white">{playlistCount}</p>
          <p className="text-[#B3B3B3] text-sm mt-1">🎵 Playlist</p>
        </div>
      </div>

      {/* Edit Nama */}
      <div className="bg-[#212121] rounded-2xl p-6 mb-4">
        <h2 className="text-white font-bold mb-4">Edit Profil</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#B3B3B3] uppercase tracking-widest block mb-2">
              Nama Tampilan
            </label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#333] focus:border-[#FF8A00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-[#B3B3B3] uppercase tracking-widest block mb-2">Email</label>
            <input type="text" value={user.email ?? ''} disabled
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[#B3B3B3] text-sm outline-none cursor-not-allowed" />
          </div>
          <button onClick={handleSave} disabled={saving}
            className="gradient-orange text-white font-bold px-6 py-2.5 rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity text-sm">
            {saved ? '✅ Tersimpan!' : saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        className="w-full bg-[#212121] hover:bg-[#2a2a2a] text-red-400 hover:text-red-300 font-medium py-3.5 rounded-2xl transition-colors text-sm border border-[#2a2a2a] hover:border-red-400/30">
        Keluar dari Akun
      </button>
    </div>
  )
}