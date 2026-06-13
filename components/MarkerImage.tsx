"use client"

import Image from "next/image"

export default function MarkerImage({ visible }: { visible: boolean }) {
  return (
    <Image
      src="/marker.png"
      alt=""
      width={464}
      height={537}
      className="absolute h-auto pointer-events-none z-30 hidden lg:block lg:top-96 lg:right-16 lg:w-44 xl:top-120 xl:right-24 xl:w-52 2xl:top-146 2xl:right-36 2xl:w-60"
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
