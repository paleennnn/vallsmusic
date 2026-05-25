import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { YTTrack } from '@/lib/youtube'

interface AuthModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

interface PlayerState {
  currentTrack: YTTrack | null
  queue: YTTrack[]
  isPlaying: boolean
  volume: number
  isShuffle: boolean
  isRepeat: boolean

  setTrack: (track: YTTrack, queue?: YTTrack[]) => void
  togglePlay: () => void
  setPlaying: (v: boolean) => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (v: number) => void
  toggleShuffle: () => void
  toggleRepeat: () => void
}

export const useAuthModal = create<AuthModalState>(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      queue: [],
      isPlaying: false,
      volume: 0.8,
      isShuffle: false,
      isRepeat: false,

      setTrack: (track, queue = []) => set({ currentTrack: track, queue, isPlaying: true }),
      togglePlay: () => set(s => ({ isPlaying: !s.isPlaying })),
      setPlaying: (v) => set({ isPlaying: v }),
      setVolume: (v) => set({ volume: v }),
      toggleShuffle: () => set(s => ({ isShuffle: !s.isShuffle })),
      toggleRepeat: () => set(s => ({ isRepeat: !s.isRepeat })),

      nextTrack: () => {
        const { queue, currentTrack, isShuffle } = get()
        if (!queue.length || !currentTrack) return
        const idx = queue.findIndex(t => t.id === currentTrack.id)
        const next = isShuffle
          ? queue[Math.floor(Math.random() * queue.length)]
          : queue[(idx + 1) % queue.length]
        set({ currentTrack: next, isPlaying: true })
      },

      prevTrack: () => {
        const { queue, currentTrack } = get()
        if (!queue.length || !currentTrack) return
        const idx = queue.findIndex(t => t.id === currentTrack.id)
        set({ currentTrack: queue[(idx - 1 + queue.length) % queue.length], isPlaying: true })
      },
    }),
    {
      name: 'vallsmusic-player',
      partialize: (state) => ({
        currentTrack: state.currentTrack,
        queue: state.queue,
        volume: state.volume,
        isShuffle: state.isShuffle,
        isRepeat: state.isRepeat,
      }),
    }
  )
)