'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  async function handleRegister() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#191414] flex items-center justify-center p-4">

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-[#212121] rounded-2xl p-8 w-full max-w-sm text-center border border-[#2a2a2a] shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full gradient-orange flex items-center justify-center mx-auto mb-5 text-3xl">
              ✓
            </div>

            <h2 className="text-xl font-black text-white mb-2">
              Registrasi Berhasil!
            </h2>
            <p className="text-[#B3B3B3] text-sm leading-relaxed mb-2">
              Mohon cek email kamu di
            </p>
            <p className="text-[#FF8A00] font-bold text-sm mb-4 break-all">
              {email}
            </p>
            <p className="text-[#B3B3B3] text-xs leading-relaxed mb-6">
              Klik link konfirmasi yang kami kirim untuk mengaktifkan akunmu dan mulai menikmati musik.
            </p>

            {/* Cek Spam notice */}
            <div className="bg-[#2a2a2a] rounded-xl p-3 mb-6 text-left">
              <p className="text-xs text-[#B3B3B3]">
                💡 <span className="text-white font-medium">Tidak menerima email?</span>
                {' '}Cek folder <span className="text-[#FF8A00]">Spam</span> atau{' '}
                <span className="text-[#FF8A00]">Promotions</span> di inbox kamu.
              </p>
            </div>

            <Link href="/login"
              className="block w-full gradient-orange text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
              Ke Halaman Login
            </Link>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="/icons/android-chrome-192x192.png" alt="VallsMusic" className="w-10 h-10 rounded-xl" />
          <span className="font-black text-xl tracking-tight">
            <span className="text-white">Valls</span>
            <span className="gradient-orange-text">Music</span>
          </span>
        </div>

        <h1 className="text-2xl font-black text-white text-center mb-1">Daftar Gratis</h1>
        <p className="text-[#B3B3B3] text-sm text-center mb-8">Buat akun VallsMusic kamu sekarang</p>

        <div className="space-y-3">
          <input type="text" placeholder="Nama tampilan" value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="w-full bg-[#212121] border border-[#333] focus:border-[#FF8A00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-[#B3B3B3]" />
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-[#212121] border border-[#333] focus:border-[#FF8A00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-[#B3B3B3]" />
          <input type="password" placeholder="Password (min. 6 karakter)" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRegister()}
            className="w-full bg-[#212121] border border-[#333] focus:border-[#FF8A00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-[#B3B3B3]" />
        </div>

        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

        <button onClick={handleRegister} disabled={loading}
          className="w-full mt-5 gradient-orange hover:opacity-90 disabled:opacity-50 text-white font-bold py-3 rounded-full text-sm transition-opacity">
          {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
        </button>

        <p className="text-center text-[#B3B3B3] text-sm mt-5">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-[#FF8A00] hover:underline font-medium">Masuk</Link>
        </p>
      </div>
    </div>
  )
}