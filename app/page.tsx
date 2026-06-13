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
  absolute
  left-4 sm:left-auto sm:right-8 lg:right-1
  bottom-[68%] sm:bottom-[20%] lg:bottom-[12%]
  max-w-[calc(100vw-2rem)] sm:max-w-[32rem] lg:max-w-[450px]
  text-left sm:text-left
  text-[1.3rem] sm:text-[1.8rem] lg:text-[2rem]
  font-medium
  leading-[1.15]
  tracking-[-0.03em]
  text-white
  z-20
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
