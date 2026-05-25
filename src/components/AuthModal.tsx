'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
  onClose: () => void
}

export default function AuthModal({ onClose }: Props) {
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-[#212121] rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl border border-[#2a2a2a]"
        onClick={e => e.stopPropagation()}>

        {/* Logo */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl overflow-hidden">
          <img src="/icons/android-chrome-192x192.png" alt="VallsMusic" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Mulai mendengarkan</h2>
        <p className="text-[#B3B3B3] text-sm mb-6">
          Daftar gratis atau masuk untuk menyimpan favorit, membuat playlist, dan menikmati musik tanpa batas.
        </p>

        <button
          onClick={() => router.push('/register')}
          className="w-full py-3 rounded-full font-bold text-sm text-white mb-3 gradient-orange hover:opacity-90 transition-opacity">
          Daftar Gratis
        </button>

        <button
          onClick={() => router.push('/login')}
          className="w-full py-3 rounded-full font-bold text-sm text-white border border-[#B3B3B3] hover:border-white transition-colors bg-transparent">
          Masuk
        </button>

        <button onClick={onClose}
          className="mt-4 text-xs text-[#B3B3B3] hover:text-white transition-colors">
          Lanjut tanpa akun
        </button>
      </div>
    </div>
  )
}