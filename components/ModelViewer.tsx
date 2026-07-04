"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, useTexture } from "@react-three/drei"
import * as THREE from "three"

function Model({ onReady, viewport, zoomProgress, rotationProgress, centerProgress, cardProgress, slideProgress }: { onReady?: () => void; viewport: "mobile" | "tablet" | "smDesktop" | "desktop"; zoomProgress: number; rotationProgress?: number; centerProgress?: number; cardProgress?: number; slideProgress?: number }) {
  const { scene } = useGLTF("/models/CodeGhost.glb")

  const baseScale = viewport === "mobile" ? 0.5 : viewport === "tablet" ? 0.65 : viewport === "smDesktop" ? 0.7 : 0.8
  const baseY = viewport === "mobile" ? -0.3 : viewport === "tablet" ? -0.35 : viewport === "smDesktop" ? -0.38 : -0.4

  const effectiveZoom = zoomProgress * (1 - (rotationProgress ?? 0))
  const scale = baseScale * (1 + effectiveZoom * 0.6)

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material
        if (mat) {
          if (Array.isArray(mat)) {
            mat.forEach(m => {
              m.envMapIntensity = 1.2
              m.transparent = true
              m.opacity = 1 - (cardProgress ?? 0)
              m.depthWrite = true
            })
          } else {
            mat.envMapIntensity = 1.2
            mat.transparent = true
            mat.opacity = 1 - (cardProgress ?? 0)
            mat.depthWrite = true
          }
        }
      }
    })
    onReady?.()
  }, [scene, onReady])

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material
        if (mat) {
          const op = 1 - (cardProgress ?? 0)
          if (Array.isArray(mat)) {
            mat.forEach(m => { m.opacity = op })
          } else {
            mat.opacity = op
          }
        }
      }
    })
  }, [scene, cardProgress])

  const rotationY = (rotationProgress ?? 0) * Math.PI * 2 * (1 - (centerProgress ?? 0))
  const positionY = (baseY + effectiveZoom * 0.15) * (1 - (centerProgress ?? 0))
  const positionX = 0

  return <primitive object={scene} scale={scale} position={[positionX, positionY, 0]} rotation={[0, rotationY, 0]} />
}

function MoonFloor({ viewport, zoomProgress }: { viewport: "mobile" | "tablet" | "smDesktop" | "desktop"; zoomProgress: number }) {
  const texture = useTexture("/moon.png")

  const baseRadius = viewport === "mobile" ? 0.9 : viewport === "tablet" ? 1.2 : viewport === "smDesktop" ? 1.3 : 1.5
  const basePosY = viewport === "mobile" ? -0.9 : viewport === "tablet" ? -1.2 : viewport === "smDesktop" ? -1.3 : -1.5

  const radius = baseRadius * (1 + zoomProgress * 0.6)
  const posY = basePosY + zoomProgress * 0.15

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

export default function ModelViewer({ onLoaded, zoomProgress = 0, rotationProgress = 0, centerProgress = 0, cardProgress = 0, slideProgress = 0, orbitProgress = 0 }: { onLoaded?: () => void; zoomProgress?: number; rotationProgress?: number; centerProgress?: number; cardProgress?: number; slideProgress?: number; orbitProgress?: number }) {
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

  const baseRadius = viewport === "mobile" ? 4.5 : viewport === "tablet" ? 5 : viewport === "smDesktop" ? 5.3 : 5.8
  const baseHeight = viewport === "mobile" ? 1.5 : viewport === "tablet" ? 1.8 : viewport === "smDesktop" ? 1.9 : 2
  const theta = orbitProgress * Math.PI * 0.6
  const camX = baseRadius * Math.sin(theta)
  const camZ = baseRadius * Math.cos(theta)
  const camY = baseHeight + orbitProgress * 1.5

  const camera = {
    position: [camX, camY, camZ] as [number, number, number],
    fov: viewport === "mobile" ? 50 : viewport === "tablet" ? 48 : viewport === "smDesktop" ? 46 : 45,
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={camera}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2, alpha: true }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0) }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, -5, -5]} intensity={0.8} />
        <Model onReady={onLoaded} viewport={viewport} zoomProgress={zoomProgress} rotationProgress={rotationProgress} centerProgress={centerProgress} cardProgress={cardProgress} slideProgress={slideProgress} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
