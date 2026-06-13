"use client"

import { useState, useCallback, useEffect } from "react"
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <div className="w-full h-dvh bg-[#0a0a0a] bg-[url('/bg.png')] bg-cover bg-center flex relative overflow-hidden">
        <Navbar/>
        <Logo />
        <KeyboardImage visible={showKeyboard} />
        <MouseImage visible={showKeyboard} />
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
  text-white
">
 From brute force to optimal solutions—guided by an AI mentor built for DSA.
</p>
        <NotesImage visible={showKeyboard} />
        <MarkerImage visible={showKeyboard} />

        <div className="w-full h-full">
          <ModelViewer onLoaded={onModelLoaded} />
        </div>
      </div>

      <section className="h-dvh bg-black" />
    </>
  )
}
