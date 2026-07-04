"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"

function cloneWithMaterials(src: THREE.Group) {
  const cloned = src.clone(true)
  cloned.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      if (Array.isArray(child.material)) {
        child.material = child.material.map(m => m.clone())
      } else {
        child.material = child.material.clone()
      }
    }
  })
  const meshes: THREE.Mesh[] = []
  cloned.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      for (const m of mats) {
        m.transparent = true
        m.opacity = 0
        m.depthWrite = true
        m.needsUpdate = true
      }
      meshes.push(child)
    }
  })
  return { scene: cloned, meshes }
}

function MoonModel({ progress, nexodeProgress, glowProgress, tearProgress }: { progress: number; nexodeProgress: number; glowProgress: number; tearProgress: number }) {
  const { scene: originalScene } = useGLTF("/models/CodeGhost.glb")
  const meshesRef = useRef<THREE.Mesh[]>([])
  const progressRef = useRef(progress)
  progressRef.current = progress
  const nexRef = useRef(nexodeProgress)
  nexRef.current = nexodeProgress
  const glowRef = useRef(glowProgress)
  glowRef.current = glowProgress
  const tearRef = useRef(tearProgress)
  tearRef.current = tearProgress

  const rootRef = useRef<THREE.Group>(null!)
  if (!rootRef.current) {
    const { scene, meshes } = cloneWithMaterials(originalScene)
    scene.rotation.y = Math.PI*2
    rootRef.current = scene
    meshesRef.current = meshes
  }
  const root = rootRef.current

  useFrame(() => {
    const raw = progressRef.current
    const nex = nexRef.current
    const glow = glowRef.current
    const tear = tearRef.current

    const p = raw * raw * (3 - 2 * raw)
    const nexSmooth = nex * nex * (3 - 2 * nex)
    const gp = glow * glow * (3 - 2 * glow)

    root.position.y = 2 - p * 2
    root.position.x = nexSmooth * 0.5 + tear * 0.4
    root.scale.setScalar((0.2 + p * 0.8) * (1 - nexSmooth * 0.28))

    const opacity = Math.min(p * 3, 1)
    for (const mesh of meshesRef.current) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      for (const m of mats) {
        const mat = m as THREE.MeshStandardMaterial
        mat.opacity = opacity * (1 - tear)
        const emissiveStrength = gp * 0.8 * (1 - tear)
        if (emissiveStrength > 0.01) {
          mat.emissive = new THREE.Color(0xffffff)
          mat.emissiveIntensity = emissiveStrength
          mat.needsUpdate = true
        } else {
          mat.emissive = new THREE.Color(0x000000)
          mat.emissiveIntensity = 0
          mat.needsUpdate = true
        }
      }
    }
  })

  return <primitive object={root} />
}

export default function MoonScene({ moonProgress = 0, nexodeProgress = 0, glowProgress = 0, tearProgress = 0 }: { moonProgress?: number; nexodeProgress?: number; glowProgress?: number; tearProgress?: number }) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 1, 4], fov: 45 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={6} />
        <directionalLight position={[-5, -5, -5]} intensity={2} />
        <MoonModel progress={moonProgress} nexodeProgress={nexodeProgress} glowProgress={glowProgress} tearProgress={tearProgress} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
