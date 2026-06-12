"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, useTexture } from "@react-three/drei"
import * as THREE from "three"

function Model({ onReady }: { onReady?: () => void }) {
  const { scene } = useGLTF("/models/CodeGhost.glb")

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

  return <primitive object={scene} scale={0.8} position={[0, -0.4, 0]} />
}

function MoonFloor() {
  const texture = useTexture("/moon.png")

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <circleGeometry args={[1.5, 64]} />
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
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    function check() {
      const w = window.innerWidth
      if (w < 640) setViewport("mobile")
      else if (w < 1024) setViewport("tablet")
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
        <Model onReady={onLoaded} />
        <MoonFloor />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
