"use client"

import Image from "next/image"

export default function MarkerImage({ visible }: { visible: boolean }) {
  return (
    <Image
      src="/marker.png"
      alt=""
      width={464}
      height={537}
      className="absolute top-146 right-36 w-60 h-auto pointer-events-none z-30"
      style={{
        transform: visible
          ? "translateX(0) rotate(2deg)"
          : "translateX(-120%) rotate(-6deg)",
        transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      priority
    />
  )
}
