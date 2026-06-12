"use client"

import { useState, useCallback } from "react"
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

  return (
    <div className="w-full h-dvh bg-[#0a0a0a] bg-[url('/bg.png')] bg-cover bg-center flex relative overflow-hidden">
        <Navbar/>
      <Logo />
      {/* Keyboard layer */}
      <KeyboardImage visible={showKeyboard} />
      <MouseImage visible={showKeyboard} />
      <NotesImage visible={showKeyboard} />
      <MarkerImage visible={showKeyboard} />

      {/* 3D Model */}
      <div className="w-full h-full">
        <ModelViewer onLoaded={onModelLoaded} />
      </div>

    </div>
  )
}
