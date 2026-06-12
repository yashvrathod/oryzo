"use client"

import Image from "next/image"

export default function NotesImage({ visible }: { visible: boolean }) {
  return (
    <Image
      src="/notes.png"
      alt=""
      width={567}
      height={440}
      className="absolute top-92 -left-52 w-192 h-auto pointer-events-none z-30 hidden lg:block"
      style={{
        transform: visible
          ? "translateX(0) rotate(-3deg)"
          : "translateX(-120%) rotate(6deg)",
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      priority
    />
  )
}
