"use client"

import { useState } from "react"
import Link from "next/link"

const links = [
  { href: "#intro", label: "Intro" },
  { href: "#features", label: "Features" },
  { href: "#practice", label: "Practice" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Top Navigation */}
      <nav className="absolute top-4 sm:top-8 left-0 right-0 z-50 flex items-start justify-between px-4 sm:px-10 lg:px-16">
        {/* Left Dot */}
        <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#f5ece0]" />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.25em] text-[#f5ece0]">
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
            className={`block h-0.5 w-6 bg-[#f5ece0] transition-all duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#f5ece0] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#f5ece0] transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
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
     <div className="absolute right-0 z-50 bg-[#f5ece0]/90 backdrop-blur-md hidden lg:block -translate-y-1/2
                     lg:top-[18%] lg:py-20
                     xl:top-[22%] xl:py-24
                     2xl:top-1/4 2xl:py-30">
  <span className="block rotate-90 origin-center whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.25em] text-black">
    neXode • AI DSA Mentor
  </span>
</div>
    </>
  )
}
