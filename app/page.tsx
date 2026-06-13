"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Lenis from "lenis"
import ModelViewer from "@/components/ModelViewer"
import KeyboardImage from "@/components/KeyboardImage"
import MouseImage from "@/components/MouseImage"
import Logo from "@/components/Logo"
import NotesImage from "@/components/NotesImage"
import MarkerImage from "@/components/MarkerImage"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [showKeyboard, setShowKeyboard] = useState(false)

  const onModelLoaded = useCallback(() => {
    requestAnimationFrame(() => {
      setTimeout(() => setShowKeyboard(true), 600)
    })
  }, [])

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

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

  const fadeStart = 0
  const fadeEnd = 400

  const progress = Math.min(
    Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0),
    1
  )

  const logoStart = 300
  const logoEnd = 600

  const logoProgress = Math.min(
    Math.max((scrollY - logoStart) / (logoEnd - logoStart), 0),
    1
  )

  const fadeOutOpacity = 1 - progress
  const fadeOutTranslateY = -progress * 120

  return (
    <>
      <div className="relative min-h-[200dvh]">
        <div className="sticky top-0 w-full h-dvh bg-[#0a0a0a] flex overflow-hidden">
          {/* Background - fades out on scroll */}
          <div
            className="absolute inset-0 bg-[url('/newbg.png')] bg-cover bg-center"
            style={{ opacity: fadeOutOpacity }}
          />

          {/* Model - stays visible */}
          <div className="w-full h-full">
            <ModelViewer onLoaded={onModelLoaded} zoomProgress={progress} />
          </div>

          {/* Content */}
          <Navbar />
          <Logo scrollOpacity={fadeOutOpacity} scrollTranslateY={fadeOutTranslateY} logoProgress={logoProgress} />
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
        </div>
      </div>

      <section className="h-dvh bg-black" />
    </>
  )
}
