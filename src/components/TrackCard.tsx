"use client";
import { YTTrack } from "@/lib/youtube";
import { usePlayerStore } from "@/store/playerStore";
import { useFavorites } from "@/hooks/useFavorites";
import { usePlaylists } from "@/hooks/usePlaylists";
import { createClient } from "@/lib/supabase/client";
import { useAuthModal } from "@/store/playerStore";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

interface Props {
  track: YTTrack;
  allTracks: YTTrack[];
}

export default function TrackCard({ track, allTracks }: Props) {
  const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { playlists, addTrackToPlaylist } = usePlaylists();
  const { open } = useAuthModal();
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const [toast, setToast] = useState("");
  const supabase = createClient();

  const isActive = currentTrack?.id === track.id;
  const faved = isFavorite(track.id);

  function handlePlay(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user) {
      open();
      return;
    }
    if (isActive) togglePlay();
    else setTrack(track, allTracks);
  }

  async function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user) {
      open();
      return;
    }
    await toggleFavorite(track);
    showToastMsg(faved ? "Dihapus dari favorit" : "Ditambah ke favorit ❤️");
  }

  async function handleAddToPlaylist(playlistId: string) {
    setShowMenu(false);
    const { error } = await addTrackToPlaylist(playlistId, track);
    showToastMsg(error ?? "Ditambahkan ke playlist ✅");
  }

  function showToastMsg(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  }

  return (
    <div
      className={`group relative bg-[#13131a] border rounded-2xl p-3 cursor-pointer transition-all
      ${isActive ? "border-[#FF8A00] bg-[#1e1a14]" : "border-[#2a2a3d] hover:border-[#3a3a5d] hover:bg-[#1c1c26]"}`}
    >
      {toast && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#242433] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-20 border border-[#3a3a5d]">
          {toast}
        </div>
      )}

      <div className="relative mb-3" onClick={handlePlay}>
        <img
          src={track.thumbnail}
          alt={track.title}
          className="w-full aspect-video object-cover rounded-xl"
        />
        <div
          className={`absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center transition-opacity
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          <div className="w-10 h-10 gradient-orange rounded-full flex items-center justify-center text-white">
            {isActive && isPlaying ? "⏸" : "▶"}
          </div>
        </div>
        {isActive && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF8A00] rounded-full animate-pulse" />
        )}
      </div>

      <p className="text-sm font-medium text-white truncate">{track.title}</p>
      <p className="text-xs text-zinc-400 truncate">{track.channelTitle}</p>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-zinc-600">{track.duration}</span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleFavorite}
            className={`text-base transition-colors ${faved ? "text-[#FF8A00]" : "text-zinc-500 hover:text-[#FF8A00]"}`}
          >
            {faved ? "❤️" : "🤍"}
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((v) => !v);
              }}
              className="text-zinc-500 hover:text-white text-base transition-colors"
            >
              ➕
            </button>
            {showMenu && (
              <div className="absolute bottom-6 right-0 bg-[#1c1c26] border border-[#2a2a3d] rounded-xl p-2 z-10 min-w-40 shadow-xl">
                <p className="text-xs text-zinc-600 px-2 pb-1">
                  Tambah ke playlist
                </p>
                {playlists.length === 0 ? (
                  <p className="text-xs text-zinc-500 px-2 py-1">
                    Belum ada playlist
                  </p>
                ) : (
                  playlists.map((pl) => (
                    <button
                      key={pl.id}
                      onClick={() => handleAddToPlaylist(pl.id)}
                      className="w-full text-left text-xs text-zinc-300 hover:text-white hover:bg-[#242433] px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>{pl.cover_emoji}</span>
                      {pl.name}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
