"use client"

import Card from "@/components/Card"

const positions = [
  { right: '82%', marginRight: '16px', top: '22%' },
  { right: '82%', marginRight: '16px', top: '25%' },
  { left: '90%', marginLeft: '0', top: '25%', marginTop: '6px' },
  { left: '90%', marginLeft: '6px', bottom: '0', top: '0%' },
  { left: '80%', marginRight: '6px', bottom: '0', top: '60%' },
  { left: '100%', marginRight: '6px', bottom: '0', top: '20%' },
]

const cardColors = [
  {
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.22), rgba(76,29,149,0.08))',
    border: 'rgba(139,92,246,0.28)',
    accent: '#8b5cf6',
    label: '▲ DEBUGGER',
  },
  {
    gradient: 'linear-gradient(135deg, rgba(37,99,235,0.22), rgba(30,58,138,0.08))',
    border: 'rgba(96,165,250,0.28)',
    accent: '#60a5fa',
    label: '▲ ANALYZER',
  },
  {
    gradient: 'linear-gradient(135deg, rgba(5,150,105,0.22), rgba(6,78,59,0.08))',
    border: 'rgba(52,211,153,0.28)',
    accent: '#34d399',
    label: '▲ VISUALIZER',
  },
  {
    gradient: 'linear-gradient(135deg, rgba(217,119,6,0.22), rgba(120,53,15,0.08))',
    border: 'rgba(251,191,36,0.28)',
    accent: '#fbbf24',
    label: '▲ COLLABORATION',
  },
  {
    gradient: 'linear-gradient(135deg, rgba(190,24,93,0.22), rgba(80,7,36,0.08))',
    border: 'rgba(244,114,182,0.28)',
    accent: '#f472b6',
    label: '▲ SMART PATH',
  },
]
const featureTitles = [
  "Visual algorithms. Done right.",
  "AI debugging. Without the guesswork.",
  "Performance metrics. Clear data.",
  "Collaborative mode. Real-time sync.",
  "Smart paths. Tailored for you.",
  "Mock interviews. Built to perform.",
]

const featureTexts = [
  "Master complex algorithms with step-by-step visual breakdowns and real-time execution traces that make every concept click.",
  "Debug smarter with AI that spots patterns, suggests fixes, and explains errors in plain English.",
  "Track your growth with detailed performance metrics and personalized improvement recommendations.",
  "Solve problems together with live sharing, peer reviews, and team coding sessions in real time.",
  "Get a custom learning path tailored to your skill level and target companies you want to crack.",
  "Practice technical interviews with AI-powered mock sessions, instant feedback, and company-style coding rounds.",
]

const ctaTexts = [
  "Get Started",
  "शुरू करें",       // Hindi
  "सुरू करा",        // Marathi
  "ಆರಂಭಿಸಿ",        // Kannada
  "ప్రారంభించండి",   // Telugu
  "শুরু করুন",      // Bengali
]

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
  edgeOffset = 45,
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
          const scale = (1 - absDist * 0.2) * (i === 0 ? 1.25 : 1.25)
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
              <div className="relative flex items-start">
                {src === "__saas_feature__" ? (
                  <div
                    className="
                      w-[200px] h-[280px]
                      sm:w-[240px] sm:h-[336px]
                      lg:w-[300px] lg:h-[420px]
                      xl:w-[360px] xl:h-[504px]
                      2xl:w-[400px] 2xl:h-[560px]
                      overflow-hidden rounded-lg p-2 bg-[#0a0503]
                    "
                  >
                      heheh
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

             <div
  className="absolute pointer-events-none overflow-hidden w-[100px] sm:w-[130px] lg:w-[160px] xl:w-[190px] 2xl:w-[380px] h-[150px] sm:h-[190px] lg:h-[240px] xl:h-[280px] 2xl:h-[280px]"
  style={{
    ...positions[i] as React.CSSProperties,
    borderRadius: '16px', // Slightly smoother, more modern corner radius
  }}
>
  {/* The Blurred Background Video Element */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover blur-lg scale-125 op-80"
  >
    <source src="/flower.mp4" type="video/mp4" />
  </video>

  {/* Premium Glassmorphism Container */}
  <div
    className="absolute inset-0 backdrop-blur-xl bg-black/40 flex flex-col justify-start align-left text-left"
    style={{
      background: cardColors[i % cardColors.length].gradient, // Keep your custom gradient overlay if needed
      border: `1px solid ${cardColors[i % cardColors.length].border || 'rgba(255, 255, 255, 0.12)'}`,
      borderRadius: '16px',
      padding: '24px', // Increased padding so the text has room to breathe
    }}
  >
    {/* Feature Tag */}
    <p
      className="text-[11px] font-semibold uppercase tracking-[0.85em]"
      style={{ color: cardColors[i % cardColors.length].accent || '#38bdf8' }}
    >
      {cardColors[i % cardColors.length].label || `// FEATURE 0${i + 1}`}
    </p>

    {/* Big, Bold, Punchy Title (Pure White, Tight Line Height) */}
    <h3 className="mt-2 text-white text-[26px] font-extrabold tracking-[0.65] leading-tight">
      {featureTitles[i]}
    </h3>

    {/* High-Contrast Description (Muted Off-White) */}
    <p className="mt-4 text-white/80 text-[14px]  font-normal leading-[relaxed] antialiased">
      {featureTexts[i]}
    </p>
<button
  className="
    mt-auto
    w-fit
    rounded-full
    p-[1px]
    transition-all
    duration-500
    hover:scale-[1.03]
    hover:-translate-y-0.5
    active:scale-[0.98]
  "
  style={{
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04), rgba(255,255,255,0.12))",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
  }}
>
  <span
    className="
      flex
      items-center
      gap-2
      rounded-full
      px-5
      py-2.5
      text-[11px]
      uppercase
      tracking-[0.22em]
      font-medium
    "
    style={{

      backdropFilter: "blur(20px)",
      color: "#f5ece0",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.02)",
    }}
  >
    <span>{ctaTexts[i % ctaTexts.length]}</span>
    <span style={{ opacity: 0.6 }}>↗</span>
  </span>
</button>
  </div>
</div>
              </div>
            </div>
          )
        })}


      </div>
    </div>
  )
}
