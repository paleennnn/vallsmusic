import AudioEngine from '@/components/AudioEngine'
import PlayerBar from '@/components/PlayerBar'
import MiniPlayer from '@/components/MiniPlayer'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import AuthModalWrapper from '@/components/AuthModalWrapper'
import InstallBanner from '@/components/InstallBanner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-[#191414]">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <InstallBanner />
          <main className="flex-1 overflow-y-auto pb-32 md:pb-0">
            {children}
          </main>
        </div>
      </div>
      {/* Desktop player */}
      <div className="hidden md:block">
        <PlayerBar />
      </div>
      {/* Mobile: mini player + bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#181818] border-t border-white/5 flex flex-col">
        <MiniPlayer />
        <BottomNav />
      </div>
      <AudioEngine />
      <AuthModalWrapper />
    </div>
  )
}