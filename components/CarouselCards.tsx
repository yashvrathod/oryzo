"use client"

import { useMemo } from "react"
import Card from "@/components/Card"
import SaaSFeatureCard from "@/components/SaaSFeatureCard"

const featureTexts = [
  "Master complex algorithms with step-by-step visual breakdowns and real-time execution traces that make every concept click.",
  "Debug smarter with AI that spots patterns, suggests fixes, and explains errors in plain English.",
  "Track your growth with detailed performance metrics and personalized improvement recommendations.",
  "Solve problems together with live sharing, peer reviews, and team coding sessions in real time.",
  "Get a custom learning path tailored to your skill level and target companies you want to crack.",
]

function BlurRevealText({ text, progress }: { text: string; progress: number }) {
  return (
    <p className="text-[#f5ece0] text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed font-medium max-w-md mx-auto px-4">
      {text.split('').map((char, i) => {
        const threshold = i / text.length
        const charProgress = Math.min(Math.max((progress - threshold) / 0.04, 0), 1)
        const blur = Math.max(8 * (1 - charProgress), 0)
        const opacity = Math.min(charProgress * 1.5, 1)
        const translateY = (1 - charProgress) * 6

        return (
          <span
            key={i}
            style={{
              filter: `blur(${blur}px)`,
              opacity: opacity,
              transform: `translateY(${translateY}px)`,
              display: char === ' ' ? 'inline' : 'inline',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
    </p>
  )
}

interface CarouselCardsProps {
  images?: string[]
  cardProgress?: number
  slideProgress?: number
  edgeOffset?: number
}

export default function CarouselCards({
  images = ["/f1.png", "/f1.png", "/f1.png", "/f1.png", "/f1.png"],
  cardProgress = 0,
  slideProgress = 0,
  edgeOffset = 18,
}: CarouselCardsProps) {
  const total = images.length
  const step = 1 / (total - 1)

  const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

  const activeIndex = useMemo(() => {
    const distances = images.map((_, i) => Math.abs(slideProgress - i * step))
    return distances.indexOf(Math.min(...distances))
  }, [slideProgress, images.length, step])

  const focusStrength = useMemo(() => {
    const dist = Math.abs(slideProgress - activeIndex * step) * total
    return Math.min(Math.max(1 - dist, 0), 1)
  }, [slideProgress, activeIndex, step, total])

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
              {src === "__saas_feature__" ? (
                <div
                  className="
                    w-[200px] h-[280px]
                    sm:w-[240px] sm:h-[336px]
                    lg:w-[300px] lg:h-[420px]
                    xl:w-[360px] xl:h-[504px]
                    2xl:w-[400px] 2xl:h-[560px]
                    overflow-hidden rounded-lg border-2 border-dashed border-white/70 p-2
                  "
                >
                  <SaaSFeatureCard />
                </div>
              ) : (
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
              )}
            </div>
          )
        })}

        {/* Feature text below cards */}
        <div
          className="absolute -left-[30%] text-center w-full"
          style={{
            top: '40%',
            opacity: cardProgress,
            maxWidth: '100%',
          }}
        >
          <BlurRevealText
            text={featureTexts[activeIndex] ?? ""}
            progress={focusStrength}
          />
        </div>
      </div>
    </div>
  )
}
