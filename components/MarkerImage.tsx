"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function MarkerImage({
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
      const t = setTimeout(() => setEntryDone(true), 950)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <Image
      src="/marker.png"
      alt=""
      width={464}
      height={537}
      className="absolute h-auto pointer-events-none z-30 hidden lg:block lg:top-96 lg:right-16 lg:w-44 xl:top-120 xl:right-24 xl:w-52 2xl:top-110 2xl:right-38 2xl:w-60"
      style={{
        transform: visible
          ? `translateX(0) rotate(2deg) translateY(${scrollTranslateY}px)`
          : `translateX(-120%) rotate(-6deg)`,
        opacity: scrollOpacity,
        transition: entryDone
          ? "none"
          : "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      priority
    />
  )
}
