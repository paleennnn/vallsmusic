'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#191414] flex flex-col items-center justify-center p-8 text-center">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="text-8xl mb-2">
          {isOnline ? '✅' : '📡'}
        </div>
        {!isOnline && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        )}
      </div>

      <h1 className="text-3xl font-black text-white mb-3">
        {isOnline ? 'Koneksi Kembali!' : 'Kamu Sedang Offline'}
      </h1>

      <p className="text-[#B3B3B3] text-sm max-w-xs mb-8 leading-relaxed">
        {isOnline
          ? 'Koneksi internetmu sudah kembali. Klik tombol di bawah untuk lanjut menikmati musik.'
          : 'VallsMusic butuh koneksi internet untuk memutar musik dari YouTube. Periksa koneksimu dan coba lagi.'}
      </p>

      {/* Status indicator */}
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8
        ${isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400 animate-pulse'}`} />
        {isOnline ? 'Terhubung' : 'Tidak ada koneksi'}
      </div>

      {isOnline ? (
        <Link href="/dashboard"
          className="gradient-orange text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
          Lanjut Dengarkan Musik
        </Link>
      ) : (
        <button onClick={() => window.location.reload()}
          className="border border-[#B3B3B3] text-[#B3B3B3] hover:text-white hover:border-white font-bold px-8 py-3 rounded-full transition-colors">
          Coba Lagi
        </button>
      )}

      {/* Tips */}
      {!isOnline && (
        <div className="mt-12 bg-[#212121] rounded-2xl p-5 max-w-xs text-left">
          <p className="text-white text-sm font-bold mb-3">💡 Tips saat offline:</p>
          <ul className="space-y-2 text-[#B3B3B3] text-xs">
            <li className="flex items-start gap-2">
              <span className="text-[#FF8A00] mt-0.5">•</span>
              Periksa koneksi WiFi atau data seluler kamu
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF8A00] mt-0.5">•</span>
              Coba matikan dan nyalakan ulang WiFi
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF8A00] mt-0.5">•</span>
              Pastikan tidak ada gangguan provider internet
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}