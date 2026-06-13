"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, useTexture } from "@react-three/drei"
import * as THREE from "three"

function Model({ onReady, viewport }: { onReady?: () => void; viewport: "mobile" | "tablet" | "smDesktop" | "desktop" }) {
  const { scene } = useGLTF("/models/CodeGhost.glb")

  const scale = viewport === "mobile" ? 0.5 : viewport === "tablet" ? 0.65 : viewport === "smDesktop" ? 0.7 : 0.8
  const positionY = viewport === "mobile" ? -0.3 : viewport === "tablet" ? -0.35 : viewport === "smDesktop" ? -0.38 : -0.4

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial
        if (mat) {
          mat.envMapIntensity = 1.2
        }
      }
    })
    onReady?.()
  }, [scene, onReady])

  return <primitive object={scene} scale={scale} position={[0, positionY, 0]} />
}

function MoonFloor({ viewport }: { viewport: "mobile" | "tablet" | "smDesktop" | "desktop" }) {
  const texture = useTexture("/moon.png")

  const radius = viewport === "mobile" ? 0.9 : viewport === "tablet" ? 1.2 : viewport === "smDesktop" ? 1.3 : 1.5
  const posY = viewport === "mobile" ? -0.9 : viewport === "tablet" ? -1.2 : viewport === "smDesktop" ? -1.3 : -1.5

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, posY, 0]} receiveShadow>
      <circleGeometry args={[radius, 64]} />
      <meshStandardMaterial
        map={texture}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function ModelViewer({ onLoaded }: { onLoaded?: () => void }) {
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "smDesktop" | "desktop">("desktop")

  useEffect(() => {
    function check() {
      const w = window.innerWidth
      if (w < 640) setViewport("mobile")
      else if (w < 1024) setViewport("tablet")
      else if (w < 1440) setViewport("smDesktop")
      else setViewport("desktop")
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const camera = viewport === "mobile"
    ? { position: [2, 1.5, 4] as [number, number, number], fov: 50 }
    : viewport === "tablet"
    ? { position: [2.5, 1.8, 4.5] as [number, number, number], fov: 48 }
    : viewport === "smDesktop"
    ? { position: [2.8, 1.9, 4.8] as [number, number, number], fov: 46 }
    : { position: [3, 2, 5] as [number, number, number], fov: 45 }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={camera}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2, alpha: true }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}
        shadows
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <Model onReady={onLoaded} viewport={viewport} />
        <MoonFloor viewport={viewport} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
    