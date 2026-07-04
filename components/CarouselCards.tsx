"use client"

import Card from "@/components/Card"

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
  {
    gradient: 'linear-gradient(135deg, rgba(20,184,166,0.22), rgba(6,78,59,0.08))',
    border: 'rgba(94,234,212,0.28)',
    accent: '#5eead4',
    label: '▲ MOCK INTERVIEWS',
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
  "शुरू करें",
  "सुरू करा",
  "ಆರಂಭಿಸಿ",
  "ప్రారంభించండి",
  "শুরু করুন",
]

interface CarouselCardsProps {
  images?: string[]
  cardProgress?: number
  activeIndex?: number
  onPrev?: () => void
  onNext?: () => void
}

export default function CarouselCards({
  images = ["/f1.png", "/f1.png", "/f1.png", "/f1.png", "/f1.png"],
  cardProgress = 0,
  activeIndex = 0,
  onPrev = () => {},
  onNext = () => {},
}: CarouselCardsProps) {
  const total = images.length
  const c = cardColors[activeIndex]

  return (
    <div className="absolute inset-0 z-30 pointer-events-none" style={{ opacity: cardProgress }}>
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 xl:gap-16 max-w-6xl mx-auto px-6">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Card
              imageSrc={images[activeIndex]}
              progress={1}
              className="w-[240px] h-[170px] sm:w-[300px] sm:h-[210px] lg:w-[380px] lg:h-[270px] xl:w-[460px] xl:h-[325px] 2xl:w-[560px] 2xl:h-[395px]"
            />
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.85em]"
              style={{ color: c.accent }}
            >
              {c.label}
            </p>

            <h3 className="mt-3 text-[24px] sm:text-[28px] lg:text-[34px] xl:text-[40px] 2xl:text-[48px] font-extrabold tracking-[-0.03em] text-white leading-[1.1] font-heading">
              {featureTitles[activeIndex]}
            </h3>

            <p className="mt-3 sm:mt-4 text-white/65 text-[13px] sm:text-[14px] lg:text-[15px] leading-relaxed max-w-md lg:max-w-none mx-auto lg:mx-0">
              {featureTexts[activeIndex]}
            </p>

            <div className="mt-5 lg:mt-7">
              <button
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-500 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04), rgba(255,255,255,0.12))",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
                  color: "#f5ece0",
                  backdropFilter: "blur(20px)",
                }}
              >
                <span>{ctaTexts[activeIndex]}</span>
                <span style={{ opacity: 0.6 }}>↗</span>
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-6 pointer-events-auto">
              <button
                onClick={onPrev}
                disabled={activeIndex === 0}
                className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${c.accent}40`,
                  color: c.accent,
                }}
              >←</button>
              <span className="text-white/20 text-xs font-mono tracking-wider">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                onClick={onNext}
                disabled={activeIndex === total - 1}
                className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${c.accent}40`,
                  color: c.accent,
                }}
              >→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
