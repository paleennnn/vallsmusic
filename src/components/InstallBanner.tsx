'use client'
import { useState } from 'react'
import { usePWAInstall } from '@/hooks/usePWAInstall'

export default function InstallBanner() {
  const { isInstallable, isInstalled, triggerInstall } = usePWAInstall()
  const [dismissed, setDismissed] = useState(false)

  if (!isInstallable || isInstalled || dismissed) return null

  return (
    <div className="bg-[#212121] border-b border-[#2a2a2a] px-4 py-2.5 flex items-center gap-3">
      <img src="/icons/android-chrome-192x192.png" alt="VallsMusic"
        className="w-8 h-8 rounded-lg flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-semibold">Install VallsMusic</p>
        <p className="text-[#B3B3B3] text-xs truncate">Nikmati musik lebih nyaman seperti aplikasi native</p>
      </div>
      <button onClick={triggerInstall}
        className="gradient-orange text-white text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 hover:opacity-90 transition-opacity">
        Install
      </button>
      <button onClick={() => setDismissed(true)}
        className="text-[#B3B3B3] hover:text-white transition-colors flex-shrink-0 text-lg leading-none">
        ×
      </button>
    </div>
  )
}