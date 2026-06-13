"use client"

export default function KineticMarquee({ progress = 0, opacity = 1, cardProgress = 0 }: { progress?: number; opacity?: number; cardProgress?: number }) {
  const entryProgress = Math.min(progress * 2, 1)
  const scaleGlowProgress = Math.max((progress - 0.5) * 2, 0)

  const glowScale = 1 + scaleGlowProgress * 0.5
  const cardShiftX = -cardProgress * 30
  const cardShiftY = -cardProgress * 210
  const cardScaleFactor = 1 - cardProgress * 0.75

  return (
    <div
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none flex items-center justify-center"
      style={{ opacity }}
    >
      <div
        className="text-[6rem] sm:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold tracking-[-0.04em] text-[#f5ece0] font-heading whitespace-nowrap"
        style={{
          transform: `translateX(${100 * (1 - entryProgress) + cardShiftX}vw) translateY(${cardShiftY}px) scale(${glowScale * cardScaleFactor})`,
          textShadow: `0 0 ${scaleGlowProgress * 30 * (1 - cardProgress * 0.7)}px rgba(245, 236, 224, ${scaleGlowProgress * 0.6 * (1 - cardProgress * 0.5)})`,
        }}
      >
        FEATURES
      </div>
    </div>
  )
}
