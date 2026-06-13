"use client"

export default function HudOverlay({ progress = 0, cardProgress = 0 }: { progress?: number; cardProgress?: number }) {
  const mainRing = Math.min(Math.max((progress - 0) / 0.4, 0), 1)
  const frameRect = Math.min(Math.max((progress - 0.3) / 0.4, 0), 1)
  const detailsShow = Math.min(Math.max((progress - 0.6) / 0.4, 0), 1)

  const cx = 200, cy = 200, ringR = 130
  const ringDots = 40
  const ringPositions = Array.from({ length: ringDots }, (_, i) => {
    const a = (i / ringDots) * Math.PI * 2
    return { x: cx + ringR * Math.cos(a), y: cy + ringR * Math.sin(a) }
  })
  const ringVisible = Math.floor(ringDots * mainRing)

  const rectX = 48, rectY = 48, rectW = 304, rectH = 304
  const dotsPerSide = 20
  const rectPositions = []
  for (let i = 0; i < dotsPerSide; i++) {
    const t = i / (dotsPerSide - 1)
    rectPositions.push({ x: rectX + t * rectW, y: rectY })
  }
  for (let i = 1; i < dotsPerSide; i++) {
    const t = i / (dotsPerSide - 1)
    rectPositions.push({ x: rectX + rectW, y: rectY + t * rectH })
  }
  for (let i = 1; i < dotsPerSide; i++) {
    const t = i / (dotsPerSide - 1)
    rectPositions.push({ x: rectX + rectW - t * rectW, y: rectY + rectH })
  }
  for (let i = 1; i < dotsPerSide - 1; i++) {
    const t = i / (dotsPerSide - 1)
    rectPositions.push({ x: rectX, y: rectY + rectH - t * rectH })
  }
  const rectVisible = Math.floor(rectPositions.length * frameRect)

  const innerRing = Math.min(Math.max((detailsShow - 0.2) / 0.8, 0), 1)
  const innerDots = 24
  const innerPositions = Array.from({ length: innerDots }, (_, i) => {
    const a = (i / innerDots) * Math.PI * 2
    return { x: cx + 80 * Math.cos(a), y: cy + 80 * Math.sin(a) }
  })
  const innerVisible = Math.floor(innerDots * innerRing)

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px] 2xl:w-[580px] 2xl:h-[580px]"
      >
        {/* Inner elements (circles, ring ticks, crosshair, floating dot) — fade up + disappear on card phase */}
        <g style={{ opacity: 1 - cardProgress, transform: `translateY(${-cardProgress * 20}px)`, transition: cardProgress > 0 && cardProgress < 1 ? 'none' : undefined }}>
          {/* Orbital ring dots */}
          <g style={{ transformOrigin: "200px 200px", animation: "hud-rotate 20s linear infinite" }}>
            {ringPositions.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="2" fill="#f5ece0" opacity={i < ringVisible ? 0.5 : 0} />
            ))}
          </g>

          {/* Inner counter-rotating ring dots */}
          <g
            style={{
              transformOrigin: "200px 200px",
              animation: innerRing > 0.5 ? "hud-counter-rotate 30s linear infinite" : "none",
              opacity: innerRing,
            }}
          >
            {innerPositions.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#f5ece0" opacity={i < innerVisible ? 0.3 : 0} />
            ))}
          </g>

          {/* Cardinal ticks on ring — phase 1 */}
          <g opacity={mainRing * 0.5}>
            <line x1="200" y1="70" x2="200" y2="80" stroke="#f5ece0" strokeWidth="1.5" />
            <line x1="200" y1="320" x2="200" y2="330" stroke="#f5ece0" strokeWidth="1.5" />
            <line x1="70" y1="200" x2="80" y2="200" stroke="#f5ece0" strokeWidth="1.5" />
            <line x1="320" y1="200" x2="330" y2="200" stroke="#f5ece0" strokeWidth="1.5" />
          </g>

          {/* Crosshair lines — phase 3 */}
          <g opacity={detailsShow * 0.25}>
            <line x1="140" y1="200" x2="170" y2="200" stroke="#f5ece0" strokeWidth="0.5" />
            <line x1="230" y1="200" x2="260" y2="200" stroke="#f5ece0" strokeWidth="0.5" />
            <line x1="200" y1="140" x2="200" y2="170" stroke="#f5ece0" strokeWidth="0.5" />
            <line x1="200" y1="230" x2="200" y2="260" stroke="#f5ece0" strokeWidth="0.5" />
          </g>

          {/* Floating indicator dot — phase 3 */}
          <g opacity={detailsShow}>
            <circle cx="200" cy="70" r="3" fill="#f5ece0" opacity={0.4 + detailsShow * 0.6}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="70" r="7" fill="none" stroke="#f5ece0" strokeWidth="0.5" opacity={0.1 + detailsShow * 0.2}>
              <animate attributeName="r" values="7;12;7" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>

        {/* Outer box elements — scale up + stretch vertically into a tall rectangle on card phase */}
        <g transform={`translate(200, 200) scale(${1 - cardProgress * 0.15}, ${1 + cardProgress * 0.3}) translate(-200, -200)`}>
          {/* Glass background — transparent card fill */}
          <rect x="48" y="48" width="304" height="304" rx="12"
            fill={`rgba(20, 14, 10, ${cardProgress * 0.25})`}
            stroke={`rgba(245, 236, 224, ${cardProgress * 0.35})`}
            strokeWidth={`${1 + cardProgress * 1.5}`}
            opacity={cardProgress}
          />

          {/* Rect frame dots */}
          {rectPositions.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2" fill="#f5ece0" opacity={i < rectVisible ? 0.35 : 0} />
          ))}

          {/* Corner brackets — fade in during phase 2 */}
          <g opacity={frameRect * 0.6}>
            <path d="M48 80 L48 48 L80 48" fill="none" stroke="#f5ece0" strokeWidth="2" />
            <path d="M352 80 L352 48 L320 48" fill="none" stroke="#f5ece0" strokeWidth="2" />
            <path d="M48 352 L48 320 L80 352" fill="none" stroke="#f5ece0" strokeWidth="2" />
            <path d="M352 352 L352 320 L320 352" fill="none" stroke="#f5ece0" strokeWidth="2" />
          </g>

          {/* Mid-edge ticks — phase 2 */}
          <g opacity={frameRect * 0.4}>
            <line x1="192" y1="48" x2="208" y2="48" stroke="#f5ece0" strokeWidth="1" />
            <line x1="192" y1="352" x2="208" y2="352" stroke="#f5ece0" strokeWidth="1" />
            <line x1="48" y1="192" x2="48" y2="208" stroke="#f5ece0" strokeWidth="1" />
            <line x1="352" y1="192" x2="352" y2="208" stroke="#f5ece0" strokeWidth="1" />
          </g>

          {/* Sub-cardinal ticks — phase 2 */}
          <g opacity={frameRect * 0.3}>
            <line x1="124" y1="124" x2="133" y2="133" stroke="#f5ece0" strokeWidth="1" />
            <line x1="276" y1="124" x2="267" y2="133" stroke="#f5ece0" strokeWidth="1" />
            <line x1="124" y1="276" x2="133" y2="267" stroke="#f5ece0" strokeWidth="1" />
            <line x1="276" y1="276" x2="267" y2="267" stroke="#f5ece0" strokeWidth="1" />
          </g>

          {/* Data label dashes — phase 2 */}
          <g opacity={frameRect * 0.5}>
            <line x1="82" y1="84" x2="100" y2="84" stroke="#f5ece0" strokeWidth="1.5" />
            <line x1="82" y1="90" x2="92" y2="90" stroke="#f5ece0" strokeWidth="1.5" />
            <line x1="300" y1="84" x2="318" y2="84" stroke="#f5ece0" strokeWidth="1.5" />
            <line x1="308" y1="90" x2="318" y2="90" stroke="#f5ece0" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  )
}
