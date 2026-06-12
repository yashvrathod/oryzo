"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <>
      {/* Top Navigation */}
      <nav className="absolute top-8 left-0 right-0 z-50 flex items-start justify-between px-10 lg:px-16">

        {/* Left Dot */}
        <div className="h-4 w-4 rounded-full bg-white" />

        {/* Right Links */}
        <div className="flex items-center gap-8 text-xs font-medium uppercase tracking-[0.25em] text-white">
          <Link href="#intro">Intro</Link>
          <Link href="#features">Features</Link>
          <Link href="#practice">Practice</Link>
          <Link href="#contact">Contact</Link>
        </div>

      </nav>

      {/* Right Vertical Label */}
     <div className="absolute right-0 top-1/2 z-50 -translate-y-1/2 bg-white/90 px-1 py-30 backdrop-blur-md">
  <span className="block rotate-90 origin-center whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.25em] text-black">
    neXode • AI DSA Mentor
  </span>
</div>
    </>
  )
}
