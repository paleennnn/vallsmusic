'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else { router.push('/dashboard'); router.refresh() }
  }

  return (
    <div className="min-h-screen bg-[#191414] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/icons/android-chrome-192x192.png" alt="VallsMusic" className="w-10 h-10 rounded-xl" />
          <span className="font-black text-xl tracking-tight">
            <span className="text-white">Valls</span>
            <span className="gradient-orange-text">Music</span>
          </span>
        </div>

        <h1 className="text-2xl font-black text-white text-center mb-1">Masuk ke VallsMusic</h1>
        <p className="text-[#B3B3B3] text-sm text-center mb-8">Selamat datang kembali!</p>

        <div className="space-y-3">
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-[#212121] border border-[#333] focus:border-[#FF8A00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-[#B3B3B3]" />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full bg-[#212121] border border-[#333] focus:border-[#FF8A00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-[#B3B3B3]" />
        </div>

        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

        <button onClick={handleLogin} disabled={loading}
          className="w-full mt-5 gradient-orange hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 rounded-full text-sm transition-opacity">
          {loading ? 'Masuk...' : 'Masuk'}
        </button>

        <p className="text-center text-[#B3B3B3] text-sm mt-5">
          Belum punya akun?{' '}
          <Link href="/register" className="text-[#FF8A00] hover:underline font-medium">Daftar Gratis</Link>
        </p>
      </div>
    </div>
  )
}