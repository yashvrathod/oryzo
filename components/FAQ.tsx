"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const faqs = [
  {
    q: "What makes Nexode different from other DSA platforms?",
    a: "Nexode combines real-time AI feedback with adaptive problem sets and step-by-step visual breakdowns — it's like having a senior engineer guide you through every concept.",
  },
  {
    q: "How does the AI mentor adapt to my skill level?",
    a: "The AI analyzes your problem-solving patterns, identifies weak areas, and dynamically adjusts difficulty. It tailors recommendations to help you improve where it matters most.",
  },
  {
    q: "Can I track my progress over time?",
    a: "Yes. Detailed performance metrics, skill graphs, and personalized improvement reports show exactly how you're growing across topics and difficulty levels.",
  },
  {
    q: "What languages are supported?",
    a: "We support Python, Java, C++, and JavaScript initially. More languages will be added based on community demand.",
  },
  {
    q: "Is there a free tier available?",
    a: "Yes. Start with a generous free tier to explore the platform. Premium plans unlock advanced analytics, unlimited mock interviews, and priority AI feedback.",
  },
  {
    q: "How are mock interviews structured?",
    a: "Mock interviews simulate real company-style coding rounds with a live AI interviewer, instant feedback on your approach, and a detailed post-interview breakdown.",
  },
  {
    q: "Does Nexode work for beginners with no DSA experience?",
    a: "Absolutely. The AI mentor starts with fundamentals, assesses your current level, and gradually increases complexity. No prior DSA knowledge required.",
  },
  {
    q: "Can I use Nexode alongside LeetCode or other platforms?",
    a: "Yes. Nexode complements any practice routine. Import your problem history, track cross-platform progress, and get AI insights that work wherever you code.",
  },
  {
    q: "What makes the AI feedback different from automated test cases?",
    a: "Instead of just pass/fail, Nexode's AI explains why your approach works or doesn't, suggests optimizations, and shows alternative solutions with complexity trade-offs.",
  },
]

export default function FAQ({ progress = 0 }: { progress?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const p = Math.min(progress * 1.5, 1)
  const translateY = (1 - p) * 50

  const gap = 24
  const total = faqs.length

  const recalc = useCallback((index: number) => {
    const cardWidth = cardRef.current?.offsetWidth ?? 380
    setOffset(index * (cardWidth + gap))
  }, [])

  useEffect(() => {
    recalc(currentIndex)
  }, [currentIndex, recalc])

  useEffect(() => {
    const onResize = () => recalc(currentIndex)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [currentIndex, recalc])

  const maxPos = total - 3

  const goNext = () => {
    setCurrentIndex((i) => (i + 1) % (maxPos + 1))
  }

  const goPrev = () => {
    setCurrentIndex((i) => (i - 1 + maxPos + 1) % (maxPos + 1))
  }

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center"
      style={{
        opacity: p,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(99,102,241,0.08)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'rgba(129,140,248,0.06)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-zinc-800/50 pb-8">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-400">
              Frequently{" "}
              <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-200 font-medium">
                Asked Questions
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-md">
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Find answers to common questions about Nexode, our AI DSA mentor, and how the platform works.
            </p>
            <div className="flex gap-3 shrink-0 pointer-events-auto">
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-950/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center bg-zinc-800 text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative w-full overflow-hidden select-none">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {faqs.map((faq, i) => {
              const isActive = i === currentIndex + 1
              return (
                <div
                  key={i}
                  ref={i === 0 ? cardRef : undefined}
                  className={`shrink-0 w-[300px] md:w-[380px] min-h-[400px] rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 border ${
                    isActive
                      ? "border-indigo-500/30 bg-gradient-to-b from-indigo-950/80 to-purple-950/90 shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)] z-10"
                      : "border-zinc-800/50 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 backdrop-blur-sm z-0"
                  }`}
                  style={{ transform: `scale(${isActive ? 1.05 : 0.88})` }}
                >
                  <h3
                    className={`text-xl md:text-2xl font-light leading-snug transition-colors duration-500 ${
                      isActive ? "text-indigo-100" : "text-zinc-400"
                    }`}
                  >
                    {faq.q}
                  </h3>
                  <div
                    className={`text-sm font-light leading-relaxed transition-all duration-300 ${
                      isActive
                        ? "text-indigo-200/80 opacity-100 max-h-[300px] mt-4"
                        : "text-zinc-400 opacity-0 max-h-0 mt-0 overflow-hidden"
                    }`}
                  >
                    {faq.a}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
