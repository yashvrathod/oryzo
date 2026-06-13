"use client"

import Image from "next/image"

export default function KeyboardImage({ visible }: { visible: boolean }) {
  return (
    <Image
      src="/keyboard.png"
      alt=""
      width={1699}
      height={624}
      className="absolute h-auto pointer-events-none z-30 hidden lg:block lg:top-18 lg:-right-58 lg:w-[40rem] xl:top-16 xl:-right-64 xl:w-[50rem] 2xl:top-31 2xl:-right-62 2xl:w-[60rem]"
      style={{
        transform: visible
          ? "translateX(0) rotate(-5deg)"
          : "translateX(120%) rotate(12deg)",
        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      priority
    />
  )
}
