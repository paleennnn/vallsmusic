export default function Footer() {
  const sections = [
    {
      title: 'VallsMusic',
      links: ['Tentang', 'Kontak', 'Karir'],
    },
    {
      title: 'Komunitas',
      links: ['Untuk Artis', 'Pengembang', 'Iklan'],
    },
    {
      title: 'Tautan Berguna',
      links: ['Dukungan', 'Aplikasi Mobile', 'Kebijakan Privasi'],
    },
    {
      title: 'Fitur',
      links: ['Putar Musik', 'Buat Playlist', 'Lagu Favorit', 'Cari Lagu'],
    },
  ]

  const socials = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/valeennszz',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: 'https://x.com/paleennnn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/febyanvalentino',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com/paleennnn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="mt-16 border-t border-[#2a2a2a] pt-10 pb-24 md:pb-10">
      {/* Grid links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {sections.map(section => (
          <div key={section.title}>
            <h4 className="text-white font-bold text-sm mb-4">{section.title}</h4>
            <ul className="space-y-3">
              {section.links.map(link => (
                <li key={link}>
                  <a href="#"
                    className="text-[#B3B3B3] text-sm hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Socials */}
        <div className="col-span-2 md:col-span-4 flex md:justify-end gap-3 mt-2 md:mt-0 md:absolute md:top-0 md:right-0">
        </div>
      </div>

      {/* Social icons row */}
      <div className="flex gap-3 mb-8">
        {socials.map(s => (
          <a key={s.label} href={s.href} aria-label={s.label}
            className="w-10 h-10 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-full flex items-center justify-center text-white transition-colors">
            {s.icon}
          </a>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2a2a2a] pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          {['Hukum', 'Pusat Keamanan & Privasi', 'Kebijakan Privasi', 'Cookie'].map(item => (
            <a key={item} href="#"
              className="text-[#B3B3B3] text-xs hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>
        <p className="text-[#B3B3B3] text-xs">© 2026 VallsMusic</p>
      </div>
    </footer>
  )
}