"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const el = document.querySelector("main");
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 10);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const isSearch = pathname === "/dashboard/search";

  return (
    <header
      className={`sticky top-0 z-30 flex items-center gap-3 px-4 py-3 transition-colors duration-300
      ${scrolled ? "bg-[#191414]/95 backdrop-blur-md" : "bg-transparent"}`}
    >
      {/* Logo — mobile only, sebelah kiri search */}
      <div className="md:hidden flex-shrink-0">
        <img
          src="/icons/android-chrome-192x192.png"
          alt="VallsMusic"
          className="w-8 h-8 rounded-lg object-cover"
        />
      </div>

      {/* Back/Forward — desktop */}
      <div className="hidden md:flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          ‹
        </button>
        <button
          onClick={() => router.forward()}
          className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          ›
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        {isSearch ? (
          <div className="flex items-center gap-2 bg-[#2a2a2a] rounded-full px-4 py-2 border border-transparent focus-within:border-white">
            <svg
              className="w-4 h-4 text-[#B3B3B3] flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              autoFocus
              type="text"
              placeholder="Apa yang ingin kamu putar?"
              className="bg-transparent text-white text-sm outline-none w-full placeholder-[#B3B3B3]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = (e.target as HTMLInputElement).value;
                  if (val)
                    router.push(
                      `/dashboard/search?q=${encodeURIComponent(val)}`,
                    );
                }
              }}
            />
          </div>
        ) : (
          <button
            onClick={() => router.push("/dashboard/search")}
            className="flex items-center gap-2 bg-[#2a2a2a] rounded-full px-4 py-2 w-full max-w-sm text-[#B3B3B3] text-sm hover:bg-[#333] transition-colors"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Apa yang ingin kamu putar?
          </button>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        {user ? (
          <div className="relative group">
            <button className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center text-white text-sm font-bold">
              {user.email?.[0].toUpperCase()}
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-10 bg-[#333] rounded-lg py-1 w-44 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <p className="px-3 py-2 text-xs text-[#B3B3B3] truncate border-b border-[#444]">
                {user.email}
              </p>
              {/* Tambahkan tombol Profile di sini */}
              <button
                onClick={() => router.push("/dashboard/profile")}
                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#444] transition-colors"
              >
                Profil
              </button>
              <button
                onClick={() => router.push("/dashboard/favorites")}
                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#444] transition-colors"
              >
                Favorit
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#444] transition-colors border-t border-[#444] mt-1"
              >
                Keluar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/register")}
              className="text-[#B3B3B3] hover:text-white text-sm font-medium px-4 py-2 transition-colors hidden sm:block"
            >
              Daftar
            </button>
            <button
              onClick={() => router.push("/login")}
              className="gradient-orange text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Masuk
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
