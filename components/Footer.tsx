"use client"

export default function Footer({ progress = 0 }: { progress?: number }) {
  const p = Math.min(progress * 1.5, 1)
  const translateY = (1 - p * p) * 40

  return (
    <div
      className="absolute inset-0 z-20 flex items-end"
      style={{
        opacity: p,
        transform: `translateY(${translateY}px)`,
        pointerEvents: p > 0.01 ? 'auto' : 'none',
      }}
    >
      <footer
        className="w-full h-full bg-[#0a0a12] text-white p-12 md:p-20 flex flex-col justify-between overflow-hidden"
      >
        {/* Background blobs */}
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(139,92,246,0.12)' }} />
        <div className="absolute bottom-10 right-1/3 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(59,130,246,0.1)' }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          {/* Contact / Mission */}
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 font-medium tracking-wide" style={{ color: '#818cf8', fontSize: '0.8rem' }}>
                <span>✦</span>
                <span>Get in touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight max-w-2xl tracking-tight text-zinc-300">
                Interested in working together, <span className="text-zinc-500">trying the platform or simply learning more?</span>
              </h2>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Reach out at:</p>
              <a
                href="mailto:hello@nexode.dev"
                className="inline-flex items-center gap-1 text-lg md:text-xl text-zinc-200 hover:text-white transition-colors border-b border-transparent hover:border-zinc-400 pb-0.5 group"
              >
                hello@nexode.dev
                <span className="text-sm transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="lg:col-span-5 flex lg:justify-end lg:pt-24">
            <nav className="flex flex-wrap gap-x-8 gap-y-4 text-zinc-300 font-medium text-base">
              <a href="#" className="hover:text-white transition-colors">How It Works</a>
              <a href="#" className="hover:text-white transition-colors">Benefits</a>
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Team</a>
            </nav>
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative z-10 mt-24 lg:mt-32 space-y-8">
          <div className="flex items-center gap-6 select-none">
            <div
              className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-4xl font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.2), rgba(129,140,248,0.05))', color: '#818cf8' }}
            >

            </div>
            <span className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none text-white lowercase">
              nexode
            </span>
          </div>

          <hr className="border-zinc-800/60" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
            <div>
              &copy; 2026 Nexode. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-300 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">GitHub</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
