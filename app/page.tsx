"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Lenis from "lenis"
import ModelViewer from "@/components/ModelViewer"
import HudOverlay from "@/components/HudOverlay"
import CarouselCards from "@/components/CarouselCards"
import KineticMarquee from "@/components/KineticMarquee"
import KeyboardImage from "@/components/KeyboardImage"
import MouseImage from "@/components/MouseImage"
import Logo from "@/components/Logo"
import NotesImage from "@/components/NotesImage"
import MarkerImage from "@/components/MarkerImage"
import Navbar from "@/components/Navbar"
import MoonScene from "@/components/MoonScene"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"

export default function Home() {
  const [showKeyboard, setShowKeyboard] = useState(false)

  const onModelLoaded = useCallback(() => {
    requestAnimationFrame(() => {
      setTimeout(() => setShowKeyboard(true), 600)
    })
  }, [])

  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on("scroll", (e: any) => {
      setScrollY(e.animatedScroll ?? e.scroll ?? 0)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  // Fade-out range for bg, tagline, images (0–400px)
  const fadeEnd = 400
  const progress = Math.min(
    Math.max((scrollY - 0) / fadeEnd, 0),
    1
  )

  // Logo transition range (300–600px)
  const logoStart = 300
  const logoEnd = 600
  const logoProgress = Math.min(
    Math.max((scrollY - logoStart) / (logoEnd - logoStart), 0),
    1
  )

  const fadeOutOpacity = 1 - progress
  const fadeOutTranslateY = -progress * 120

  // Zoom range covers the full word reveal (0–500px)
  const zoomEnd = 500
  const zoomProgress = Math.min(
    Math.max((scrollY - 0) / zoomEnd, 0),
    1
  )
  const sideTextProgress = Math.min(Math.max((zoomProgress - 0.28) / 0.72, 0), 1)

  // Camera orbit for 3D parallax effect (0–4000px)
  const orbitProgress = Math.min(Math.max(scrollY / 4000, 0), 1)

  // Rotation starts after zoom completes (500–1200px)
  const rotationEnd = 1200
  const rotationProgress = Math.min(
    Math.max((scrollY - 500) / (rotationEnd - 500), 0),
    1
  )
  const rotationFadeOut = 1 - rotationProgress
  const rotationTextProgress = Math.min(Math.max((rotationProgress - 0.25) / 0.75, 0), 1)

  // After rotation — paragraph reveal (1200–1700px)
  const afterRotationStart = 1200
  const afterRotationEnd = 1700
  const afterRotationProgress = Math.min(
    Math.max((scrollY - afterRotationStart) / (afterRotationEnd - afterRotationStart), 0),
    1
  )

  // Final fade-out for text and hand (1700–2100px)
  const finalFadeStart = 1700
  const finalFadeEnd = 2100
  const finalFadeProgress = Math.min(
    Math.max((scrollY - finalFadeStart) / (finalFadeEnd - finalFadeStart), 0),
    1
  )
  const finalFadeOpacity = 1 - finalFadeProgress
  const finalFadeUpY = -finalFadeProgress * 40
  const finalFadeDownY = finalFadeProgress * 60

  // HUD appears after everything fades out (2100–2400px)
  const hudProgress = Math.min(
    Math.max((scrollY - 2100) / 300, 0),
    1
  )

  // Model centers + faces straight alongside HUD build-up (2100–2400px)
  const modelCenterProgress = hudProgress

  // Marquee scrolls right to left after dots are connected (2400–3600px)
  const marqueeProgress = Math.min(
    Math.max((scrollY - 2400) / 1200, 0),
    1
  )

  // Card phase — HUD box becomes a transparent card after marquee scales up (3600–4100px)
  const cardProgress = Math.min(
    Math.max((scrollY - 3600) / 500, 0),
    1
  )

  // Carousel slide — cards cycle one by one (4400–5600px)
  const carouselSlide = Math.min(
    Math.max((scrollY - 4400) / 1200, 0),
    1
  )

  const featureImages = ["/f1.png", "/f2.png", "/f3.png", "/f4.png", "/f6.png", "/f7.png"]
  const totalFeatures = featureImages.length

  const scrollToFeature = useCallback((index: number) => {
    setActiveFeature(index)
    const target = 4400 + (index / (totalFeatures - 1)) * 1200
    lenisRef.current?.scrollTo(target, { duration: 1.2 })
  }, [totalFeatures])

  const moonStart = 7200
  const moonEnd = 8000
  const moonProgress = Math.min(
    Math.max((scrollY - moonStart) / (moonEnd - moonStart), 0),
    1
  )

  const moonModelStart = 7600
  const moonModelEnd = 9200
  const moonModelProgress = Math.min(
    Math.max((scrollY - moonModelStart) / (moonModelEnd - moonModelStart), 0),
    1
  )

  const nexodeStart = 9200
  const nexodeEnd = 11200
  const nexodeProgress = Math.min(
    Math.max((scrollY - nexodeStart) / (nexodeEnd - nexodeStart), 0),
    1
  )
  const nexEased = nexodeProgress * nexodeProgress * (3 - 2 * nexodeProgress)

  const glowStart = 11200
  const glowEnd = 12400
  const glowProgress = Math.min(
    Math.max((scrollY - glowStart) / (glowEnd - glowStart), 0),
    1
  )
  const glowEased = glowProgress * glowProgress * (3 - 2 * glowProgress)

  const tearStart = 12400
  const tearEnd = 13800
  const tearProgress = Math.min(
    Math.max((scrollY - tearStart) / (tearEnd - tearStart), 0),
    1
  )
  const tearEased = tearProgress * tearProgress * (3 - 2 * tearProgress)

  // CTA — full screen first
  const ctaFadeIn = Math.min(Math.max((scrollY - 10400) / 1000, 0), 1)
  const ctaFadeOut = Math.min(Math.max((scrollY - 15000) / 1000, 0), 1)
  const ctaOpacity = ctaFadeIn * (1 - ctaFadeOut)
  const ctaEased = ctaFadeIn * ctaFadeIn * (3 - 2 * ctaFadeIn)

  // FAQ — takes over after CTA
  const faqFadeIn = Math.min(Math.max((scrollY - 15800) / 600, 0), 1)
  const faqFadeOut = Math.min(Math.max((scrollY - 17200) / 600, 0), 1)
  const faqOpacity = faqFadeIn * (1 - faqFadeOut)

  // Footer — final section
  const footerFadeIn = Math.min(Math.max((scrollY - 18000) / 300, 0), 1)

  const staggerWord = (p: number, index: number, step = 0.07, dur = 0.25) => {
    const wp = Math.min(Math.max((p - index * step) / dur, 0), 1)
    return { opacity: wp, transform: `translateY(${(1 - wp) * 24}px)` }
  }

  return (
    <>
      <Navbar isDark={tearEased > 0.5} />
      <Logo scrollOpacity={fadeOutOpacity} scrollTranslateY={fadeOutTranslateY} logoProgress={logoProgress} />
      <div className="relative min-h-[3000dvh]">
        <div className="sticky top-0 w-full h-dvh flex overflow-hidden bg-transparent">
          {/* bg-2 — revealed when dark tears */}
          <div className="absolute inset-0 bg-[url('/bg-3-1.png')] bg-cover bg-center" style={{ opacity: tearEased }} />
          {/* Persistent dark background — tears open from center */}
          <div className="absolute inset-0" style={{ background: '#0a0a0a', clipPath: `inset(0 ${50 * tearEased}% 0 ${50 * tearEased}%)` }} />

          {/* Background image - fades out on scroll */}
          <div
            className="absolute inset-0 bg-[url('/newbg.png')] bg-cover bg-center"
            style={{ opacity: fadeOutOpacity }}
          />

          {/* Model - stays visible */}
          <div className="w-full h-full relative z-[2]">
            <ModelViewer onLoaded={onModelLoaded} zoomProgress={zoomProgress} rotationProgress={rotationProgress} centerProgress={modelCenterProgress} cardProgress={cardProgress} slideProgress={carouselSlide} orbitProgress={orbitProgress} />
          </div>

          {/* Features content — fades out when moon comes */}
          <div className="absolute inset-0" style={{ opacity: 1 - moonProgress }}>
          <KineticMarquee progress={marqueeProgress} opacity={marqueeProgress} cardProgress={cardProgress} />

          {/* Content */}
          <KeyboardImage visible={showKeyboard} scrollOpacity={fadeOutOpacity} scrollTranslateY={fadeOutTranslateY} />
          <MouseImage visible={showKeyboard} scrollOpacity={fadeOutOpacity} scrollTranslateY={fadeOutTranslateY} />
          <p className="
  absolute z-20
  left-3 sm:left-6 lg:left-auto lg:right-8 xl:right-16 2xl:right-24
  top-36 sm:top-44 lg:top-auto lg:bottom-[15%] xl:bottom-[18%] 2xl:bottom-[20%]
  max-w-[calc(100vw-1.5rem)] sm:max-w-[28rem] lg:max-w-[380px] xl:max-w-[440px] 2xl:max-w-[500px]
  text-left
  text-[1rem] sm:text-[1.3rem] lg:text-[1.6rem] xl:text-[1.9rem] 2xl:text-[2.2rem]
  font-medium
  leading-[1.15]
  tracking-[-0.03em]
  text-[#f5ece0]
"
  style={{ opacity: fadeOutOpacity, transform: `translateY(${fadeOutTranslateY}px)` }}>
 From brute force to optimal solutions—guided by an AI mentor built for DSA.
</p>
          <NotesImage visible={showKeyboard} scrollOpacity={fadeOutOpacity} scrollTranslateY={fadeOutTranslateY} />
          <MarkerImage visible={showKeyboard} scrollOpacity={fadeOutOpacity} scrollTranslateY={fadeOutTranslateY} />

          {/* Side text — staggered reveal on scroll, fades out on rotation */}
          <div
            className="absolute z-20 hidden lg:block left-4 lg:left-10 xl:left-14 2xl:left-50 top-[50%] "
            style={{
              opacity: rotationFadeOut,
              transform: `translateX(${(-40 + 40 * (1 - sideTextProgress) + rotationProgress * 60)}px) translateY(-50%)`,
            }}
          >
            <h2 className="text-[2.2rem] xl:text-[2.7rem] 2xl:text-[3.2rem] font-bold tracking-[-0.04em] text-[#f5ece0] leading-[1.5] font-heading">
              {["AI-POWERED", "DSA", "COACHING"].map((word, i) => {
                const p = staggerWord(sideTextProgress, 2 - i, 0.25, 0.45)
                return (
                  <span key={i}>
                    {i === 1 ? <br /> : null}
                    <span className="inline-block" style={p}>{word}</span>
                    {i < 2 ? ' ' : ''}
                  </span>
                )
              })}
            </h2>
          </div>

          <div
            className="absolute z-20 hidden lg:block right-4 lg:right-10 xl:right-14 2xl:right-50 top-[50%] max-w-[260px] xl:max-w-[300px] 2xl:max-w-[360px]"
            style={{
              opacity: rotationFadeOut,
              transform: `translateX(${(40 - 40 * (1 - sideTextProgress) - rotationProgress * 60)}px) translateY(-50%)`,
            }}
          >
            <p className="text-[0.9rem] xl:text-[1rem] 2xl:text-[2rem] font-medium leading-[1.4] text-[#f5ece0]/80 flex flex-wrap" style={{ gap: '0.35em' }}>
              {"Get real-time feedback, adaptive problem sets, and personalized guidance tailored to your skill level.".split(" ").map((word, i) => {
                const p = staggerWord(sideTextProgress, i, 0.05, 0.25)
                return <span key={i} style={p}>{word}</span>
              })}
            </p>
          </div>

          {/* Rotation phase: heading at top center */}
          <div
            className="absolute z-20 left-1/2 top-[12%] lg:top-[15%] text-center"
            style={{
              opacity: rotationTextProgress * finalFadeOpacity,
              transform: `translateX(-50%) translateY(${finalFadeUpY}px)`,
            }}
          >
            <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] xl:text-[3.2rem] 2xl:text-[4.8rem] font-semibold tracking-[-0.03em] text-[#f5ece0] leading-[1] font-heading flex flex-wrap justify-center" style={{ gap: '0.4em' }}>


              {["Personalized","AI", "for", "every", "problem."].map((word, i) => {
                const p = staggerWord(rotationTextProgress, i, 0.12, 0.35)
                const isItalic = i === 0 || i === 3
                return <span key={i} style={{...p, fontStyle: isItalic ? 'italic' : 'normal' }}>{word}</span>
              })}
            </h2>
          </div>


          {/* HUD overlay */}
          <HudOverlay progress={hudProgress} cardProgress={cardProgress} />

          {/* Carousel — card shown via Prev/Next buttons */}
          <CarouselCards
            images={featureImages}
            cardProgress={cardProgress}
            activeIndex={activeFeature}
            onPrev={() => scrollToFeature(Math.max(0, activeFeature - 1))}
            onNext={() => scrollToFeature(Math.min(totalFeatures - 1, activeFeature + 1))}
          />

          {/* Rotation phase: hand from bottom */}
          <div
            className="absolute z-10 left-1/2 top-[45%]"
            style={{
              opacity: rotationTextProgress * finalFadeOpacity,
              transform: `translate(-50%, ${(200 - 200 * rotationTextProgress + finalFadeDownY)}px) perspective(800px) rotateX(${(-30 + 30 * rotationTextProgress)}deg)`,
              transformOrigin: "top center",
              willChange: "transform",
            }}
          >
            <img
              src="/downhand.png"
              alt=""
              className="w-[200px] sm:w-[260px] lg:w-[340px] xl:w-[420px] 2xl:w-[580px] h-auto"
              style={{ filter: `drop-shadow(0 ${-20 * (1 - rotationTextProgress)}px ${30 * (1 - rotationTextProgress)}px rgba(0,0,0,0.4))` }}
            />
          </div>

          {/* After rotation — paragraph reveal */}
          <div
            className="absolute z-20 hidden lg:block right-4 lg:right-10 xl:right-14 2xl:right-24 top-[50%] max-w-[280px] lg:max-w-[320px] xl:max-w-[380px] 2xl:max-w-[440px]"
            style={{
              opacity: afterRotationProgress * finalFadeOpacity,
              transform: `translateX(${(60 - 60 * afterRotationProgress)}px) translateY(calc(-50% + ${finalFadeUpY}px))`,
            }}
          >
            <p className="text-[1rem] lg:text-[1.15rem] xl:text-[1.3rem] 2xl:text-[1.5rem] font-medium leading-[1.7] text-[#f5ece0]/80">
              {"Master coding interviews with real-time AI feedback, adaptive challenges, and a curriculum built for your growth.".split(" ").map((word, i) => {
                const p = staggerWord(afterRotationProgress, i, 0.04, 0.2)
                return <span key={i} className="inline" style={p}>{word} </span>
              })}
            </p>
          </div>

          </div>
          <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
            <img
              src="/moon.png"
              alt=""
              className="absolute top-1/2 pointer-events-none select-none"
              style={{
                height: '85%',
                width: 'auto',
                left: '0',
                transform: `translate(${-100 + moonProgress * 50}%, -50%)`,
                opacity: 1 - tearEased,
                filter: `
                  drop-shadow(0 0 ${18 * moonProgress}px rgba(255,255,255,${0.35 * moonProgress}))
                  drop-shadow(0 0 ${40 * moonProgress}px rgba(220,220,255,${0.2 * moonProgress}))
                  drop-shadow(0 0 ${70 * moonProgress}px rgba(200,200,255,${0.1 * moonProgress}))
                `,
              }}
            />
            <div style={{ pointerEvents: 'none', transform: moonModelProgress > 0 ? 'none' : 'translate(9999px,9999px)' }}>
              <MoonScene moonProgress={moonModelProgress} nexodeProgress={nexodeProgress} glowProgress={glowProgress} tearProgress={tearEased} />
            </div>
            <div style={{ opacity: 1 - ctaFadeOut }}>
            {nexodeProgress > 0 && (
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  border: `${tearEased * 2}px solid rgba(0,0,0,${tearEased * 0.15})`,
                }}
              >
                <span
                  className="absolute top-1/2 font-extrabold font-heading tracking-[-0.04em] whitespace-nowrap"
                  style={{
                    left: '50%',
                    fontSize: 'clamp(1.4rem,3.5vw,4.2rem)',
                    color: '#EDE7DA',
                    transform: `translate(calc(-50% + ${(-21 + tearEased ) * nexEased}vw), -50%) scale(${3.18 + 0.92 * nexEased})`,
                    opacity: Math.min(nexEased * 3, 1),
                    filter: `brightness(${1 + glowEased * 5 * (1 - tearEased)})`,
                    textShadow: tearEased > 0.3 ? '0 2px 12px rgba(0,0,0,0.3)' : glowEased > 0 ? `0 0 ${glowEased * 20 * (1 - tearEased)}px rgba(255,255,255,${glowEased * 0.7 * (1 - tearEased)})` : 'none',
                  }}
                >
                  NEX
                </span>
                <span
                  className="absolute top-1/2 font-extrabold font-heading tracking-[-0.04em] whitespace-nowrap"
                  style={{
                    left: '50%',
                    fontSize: 'clamp(1.4rem,3.5vw,4.2rem)',
                    color: '#EDE7DA',
                    transform: `translate(-50%, -50%) scale(${3.18 + 0.92 * nexEased})`,
                    opacity: tearEased * Math.min(nexEased * 3, 1),
                    filter: `brightness(${1 + glowEased * 5 * (1 - tearEased)})`,
                    textShadow: tearEased > 0.3 ? '0 2px 12px rgba(0,0,0,0.3)' : glowEased > 0 ? `0 0 ${glowEased * 20 * (1 - tearEased)}px rgba(255,255,255,${glowEased * 0.7 * (1 - tearEased)})` : 'none',
                  }}
                >
                  O
                </span>
                <span
                  className="absolute top-1/2 font-extrabold font-heading tracking-[-0.04em] whitespace-nowrap"
                  style={{
                    left: '50%',
                    fontSize: 'clamp(1.4rem,3.5vw,4.2rem)',
                    color: '#EDE7DA',
                    transform: `translate(calc(-50% + ${(28 - tearEased * 12) * nexEased}vw), -50%) scale(${3.18 + 0.92 * nexEased})`,
                    opacity: Math.min(nexEased * 3, 1),
                    filter: `brightness(${1 + glowEased * 5 * (1 - tearEased)})`,
                    textShadow: tearEased > 0.3 ? '0 2px 12px rgba(0,0,0,0.3)' : glowEased > 0 ? `0 0 ${glowEased * 20 * (1 - tearEased)}px rgba(255,255,255,${glowEased * 0.7 * (1 - tearEased)})` : 'none',
                  }}
                >
                  DE
                </span>
              </div>
            )}
            </div>
            {/* Dark overlay cleans bg for FAQ + Footer */}
            <div className="absolute inset-0 bg-[#0a0a0a]" style={{ opacity: faqFadeIn }} />
            {ctaOpacity > 0 && (
              <div
                className="absolute inset-0 z-20 flex flex-col items-center justify-start pointer-events-none px-6 pt-[68vh]"
                style={{
                  opacity: ctaOpacity,
                  transform: `translateY(${(1 - ctaFadeIn) * 40}px)`,
                }}
              >
                <p className="text-[#EDE7DA] text-center max-w-[500px] text-base sm:text-lg leading-relaxed font-medium">
                  Master coding interviews with real-time AI feedback, adaptive challenges, and a curriculum built for your growth.
                </p>
                <button className="mt-10 px-10 py-4 bg-black text-[#EDE7DA] rounded-full text-sm sm:text-base font-semibold tracking-wide uppercase pointer-events-auto hover:opacity-80 transition-opacity">
                  Start Free Trial
                </button>
              </div>
            )}
            <div style={{ opacity: 1 - faqFadeOut, pointerEvents: 'auto' as const }}>
              <FAQ progress={faqFadeIn} />
            </div>
            <Footer progress={footerFadeIn} />
          </div>
        </div>
      </div>
    </>
  )
}
