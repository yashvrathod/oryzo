"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const links = [
  { href: "#intro", label: "Intro" },
  { href: "#features", label: "Features" },
  { href: "#practice", label: "Practice" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar({ isDark = false }: { isDark?: boolean }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])
  const c = '#EDE7DA'

  return (
    <>
      {/* Top Navigation */}
      <nav
        className="fixed top-4 sm:top-8 left-0 right-0 z-50 flex items-start justify-between px-4 sm:px-10 lg:px-16"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Left Dot */}
        <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full transition-colors duration-500" style={{ background: c }} />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-500" style={{ color: c }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-60 flex flex-col gap-[5px] lg:hidden p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
            style={{ background: c }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
            style={{ background: c }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
            style={{ background: c }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-[#0a0a0a] border-l border-[#f5ece0]/10 p-8 pt-24 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium uppercase tracking-[0.25em] text-[#f5ece0] hover:text-[#f5ece0]/60 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right Vertical Label */}
    <div
  className="
    fixed right-0 z-30
    w-18
    py-28
    flex items-center justify-center
    backdrop-blur-md
    hidden lg:flex
    -translate-y-1/2
    top-1/4
    transition-colors duration-500
  "
  style={{
    opacity: mounted ? 1 : 0,
    transition: 'opacity 0.6s ease 0.2s',
    background: isDark ? 'rgba(26,26,26,0.9)' : 'rgba(237,231,218,0.9)',
  }}
>
  <span className="rotate-90 whitespace-nowrap text-[14px] font-semibold uppercase tracking-wider transition-colors duration-500" style={{ color: isDark ? '#EDE7DA' : '#1a1a1a' }}>
    neXode • AI DSA Mentor
  </span>
</div>
    </>
  )
}
