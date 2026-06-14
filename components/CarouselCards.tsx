"use client"

import Card from "@/components/Card"

interface CarouselCardsProps {
  images?: string[]
  cardProgress?: number
  slideProgress?: number
  edgeOffset?: number
}

export default function CarouselCards({
  images = ["/bg.png", "/bg.png", "/bg.png", "/bg.png", "/bg.png"],
  cardProgress = 0,
  slideProgress = 0,
  edgeOffset = 25,
}: CarouselCardsProps) {
  const total = images.length
  const step = 1 / (total - 1)

  const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

  return (
    <div className="absolute inset-0 z-[6] pointer-events-none">
      <div style={{ opacity: cardProgress }}>
        {images.map((src, i) => {
          const centerMoment = i * step
          const rawDist = (slideProgress - centerMoment) / step
          if (Math.abs(rawDist) > 1.4) return null

          const absRaw = Math.abs(rawDist)
          const dist = rawDist > 0
            ? easeInOutQuad(Math.min(absRaw, 1))
            : -easeInOutQuad(Math.min(absRaw, 1))
          const absDist = Math.abs(dist)

          const left = 50 - dist * edgeOffset
          const scale = 1 - absDist * 0.5
          const top = 50 + absDist * 5
          const zIndex = Math.round((1 - absDist) * 100)
          const cardOpacity = 1 - absDist * 0.3

          return (
            <div
              key={i}
              className="absolute flex items-center justify-center"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                zIndex,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: cardOpacity,
                willChange: 'transform, opacity',
              }}
            >
              <Card
                imageSrc={src}
                progress={1}
                className="
                  w-[200px] h-[280px]
                  sm:w-[240px] sm:h-[336px]
                  lg:w-[300px] lg:h-[420px]
                  xl:w-[360px] xl:h-[504px]
                  2xl:w-[400px] 2xl:h-[560px]
                "
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
