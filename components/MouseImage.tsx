"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function MouseImage({
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
      const t = setTimeout(() => setEntryDone(true), 1000)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <Image
      src="/mousee.png"
      alt=""
      width={1182}
      height={912}
      className="absolute h-auto pointer-events-none z-30 hidden lg:block lg:top-2 lg:left-120 lg:w-55 xl:top-4 xl:left-120 xl:w-78 2xl:top-12 2xl:left-150 2xl:w-78"
      style={{
        transform: visible
          ? `translateX(0) rotate(5deg) translateY(${scrollTranslateY}px)`
          : `translateX(120%) rotate(-12deg)`,
        opacity: scrollOpacity,
        transition: entryDone
          ? "none"
          : "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      priority
    />
  )
}
