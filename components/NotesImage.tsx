"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function NotesImage({
  visible,
  scrollOpacity = 1,
  scrollTranslateY = 0,
}: {
  visible: boolean
  scrollOpacity?: number
  scrollTranslateY?: number
}) {
  const [entryDone, setEntryDone] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setEntryDone(true), 900)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <Image
      src="/notes.png"
      alt=""
      width={567}
      height={440}
      className="absolute h-auto pointer-events-none z-30 hidden lg:block lg:top-94 lg:-left-24 lg:w-96 xl:top-72 xl:-left-36 xl:w-144 2xl:top-92 2xl:-left-52 2xl:w-192"
      style={{
        transform: visible
          ? `translateX(0) rotate(-3deg) translateY(${scrollTranslateY}px)`
          : `translateX(-120%) rotate(6deg)`,
        opacity: scrollOpacity,
        transition: entryDone
          ? "none"
          : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      priority
    />
  )
}
