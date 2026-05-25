# 🎵 VallsMusic

**VallsMusic** adalah aplikasi streaming musik berbasis web yang modern dan responsif, dibangun menggunakan **Next.js 14**. Aplikasi ini terintegrasi dengan **YouTube IFrame Player API** untuk menyajikan ribuan lagu langsung dari YouTube, dibalut dengan antarmuka (UI) premium bertema **Orange Rebrand**.

---

## ✨ Fitur Utama

- **🚀 YouTube Engine**: Pencarian dan pemutaran musik langsung dari API YouTube.
- **📱 Mobile Ready**: Miniplayer responsif yang tetap aktif saat navigasi (mirip Spotify/YouTube Music).
- **🎨 Modern UI**: Tema warna oranye yang segar dengan desain kartu lagu (TrackCard) yang interaktif.
- **🔐 Supabase Auth**: Sistem autentikasi aman untuk menyimpan koleksi favorit dan playlist pengguna.
- **💿 Audio Persistence**: State musik tetap tersimpan (persist) menggunakan Zustand, sehingga lagu tidak terhenti saat refresh halaman.
- **💾 Tab Favorites**: Simpan lagu favorit Anda langsung ke database melalui Supabase SSR.

---

## 🛠️ Teknologi yang Digunakan

| Tech | Fungsi |
| :--- | :--- |
| **Next.js 14** | Framework React dengan App Router |
| **Zustand** | State Management (Audio Player & UI) |
| **Supabase** | Backend, Database, & Autentikasi |
| **Tailwind CSS** | Styling modern & responsif |
| **YouTube API** | Sumber metadata dan audio stream |

---

## 🚀 Instalasi & Persiapan

1. **Clone repositori:**
   ```bash
   git clone https://github.com/vallen-nsz/valls-music.git
   cd valls-music/vallsmusic-fe
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env.local` dan isi dengan kredensial berikut:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
   ```

4. **Jalankan aplikasi:**
   ```bash
   npm run dev
   ```

---

## 📂 Struktur Proyek Penting

- `src/app`: Routes utama (Beranda, Jelajahi, Koleksi, Profil).
- `src/store`: Logic global state player menggunakan Zustand + Persist middleware.
- `src/components`: Komponen UI (MiniPlayer, TrackCard, AudioEngine).
- `src/hooks`: Custom hooks seperti `useUser` untuk autentikasi Supabase.
- `src/lib`: Integrasi API YouTube dan Supabase Client.

---

## 📱 Mobile App (PWA)
Aplikasi ini mendukung manifest PWA sehingga dapat diinstal di homescreen HP Anda untuk pengalaman full-screen tanpa address bar.

---

Developed with ❤️ by **paleennnn**.