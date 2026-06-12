"use client"

import Image from "next/image"

export default function MouseImage({ visible }: { visible: boolean }) {
  return (
    <Image
      src="/mousee.png"
      alt=""
      width={1182}
      height={912}
      className="absolute top-12 left-150 w-98 h-auto pointer-events-none z-30 hidden lg:block"
      style={{
        transform: visible
          ? "translateX(0) rotate(5deg)"
          : "translateX(120%) rotate(-12deg)",
        transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      priority
    />
  )
}
