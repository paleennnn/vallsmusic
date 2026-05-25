import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#191414] flex flex-col items-center justify-center p-8 text-center">
      <p className="text-8xl mb-6">🗿</p>
      <h1 className="text-3xl font-black text-white mb-3">
        LAU MAU NYARI APE BANH
      </h1>
      <p className="text-[#B3B3B3] text-sm mb-8">
        Halaman yang lo cari kagak ada, banh.
      </p>
      <Link href="/dashboard"
        className="gradient-orange text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
        Balik ke Beranda
      </Link>
      <p className="text-[#333] text-xs mt-8">Error 404</p>
    </div>
  )
}