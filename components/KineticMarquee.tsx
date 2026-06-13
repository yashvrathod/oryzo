"use client"

export default function KineticMarquee({ progress = 0, opacity = 1 }: { progress?: number; opacity?: number }) {
  return (
    <div
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none flex items-center justify-center"
      style={{ opacity }}
    >
      <div
        className="text-[6rem] sm:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold tracking-[-0.04em] text-[#f5ece0] font-heading whitespace-nowrap"
        style={{ transform: `translateX(${100 * (1 - progress)}vw)` }}
      >
        FEATURES
      </div>
    </div>
  )
}
