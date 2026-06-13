"use client"

export default function Logo({
  scrollOpacity = 1,
  scrollTranslateY = 0,
  logoProgress = 0,
}: {
  scrollOpacity?: number
  scrollTranslateY?: number
  logoProgress?: number
}) {
  // Ease-out cubic
  const eased =
    1 - Math.pow(1 - Math.min(Math.max(logoProgress, 0), 1), 3)

  const scale = 1 - eased * 0.77
  // Final logo position
const translateX = eased * 30
const translateY = eased * -118

  return (
    <div className="absolute z-50 select-none">
      <div
        className="relative sm:top-10 sm:left-6 lg:top-16 lg:left-10 xl:top-24 xl:left-12 2xl:top-32 2xl:left-16"
        style={{
          transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
          transformOrigin: "top left",
          willChange: "transform",
        }}
      >
        <div className="relative">
          <p
            className="mb-1.5 sm:mb-2 lg:mb-3 ml-0.5 sm:ml-1 text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-[0.3em] text-[#f5ece0]/80"
            style={{
              opacity: scrollOpacity,
              transform: `translateY(${scrollTranslateY}px)`,
            }}
          >
            Personalized AI guidance for coding interviews.
          </p>

          <span
            aria-hidden
            className="absolute inset-0 text-[2.8rem] sm:text-[4.5rem] lg:text-[6.5rem] xl:text-[8.5rem] 2xl:text-[10rem]
                       font-extrabold tracking-[-0.06em]
                       text-violet-400/20 blur-2xl"
            style={{ opacity: 1 - eased }}
          >
            neXode
          </span>

          <h1
            className="relative text-[2.8rem] sm:text-[4.5rem] lg:text-[6.5rem] xl:text-[8.5rem] 2xl:text-[10rem]
                       font-extrabold tracking-[-0.06em]
                       text-[#f5ece0] leading-none font-heading"
          >
            neXode
          </h1>
        </div>
      </div>
    </div>
  )
}
