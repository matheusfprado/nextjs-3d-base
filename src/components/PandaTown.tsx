'use client'

import { Float, Text } from '@react-three/drei'
import { useMemo } from 'react'
import { CanvasTexture, Color, DoubleSide } from 'three'

function usePaintedSign(options: {
  background: string
  border: string
  accent?: string
  draw?: (context: CanvasRenderingContext2D) => void
}) {
  const { background, border, accent, draw } = options

  return useMemo(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    context.fillStyle = background
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.lineWidth = 16
    context.strokeStyle = border
    context.strokeRect(8, 8, canvas.width - 16, canvas.height - 16)

    if (accent) {
      context.fillStyle = accent
      context.fillRect(20, 20, canvas.width - 40, 52)
    }

    draw?.(context)

    const texture = new CanvasTexture(canvas)
    texture.anisotropy = 4
    texture.needsUpdate = true

    return texture
  }, [accent, background, border, draw])
}

function usePandaBillboardTexture() {
  return usePaintedSign({
    background: '#cffafe',
    border: '#0f172a',
    draw: (context) => {
      const cx = 128
      const cy = 140
      const radius = 78

      context.fillStyle = '#fefce8'
      context.beginPath()
      context.arc(cx, cy, radius, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = '#0f172a'
      context.beginPath()
      context.arc(cx - 46, cy - 52, 26, 0, Math.PI * 2)
      context.arc(cx + 46, cy - 52, 26, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = '#0f172a'
      context.beginPath()
      context.arc(cx - 30, cy + 12, 16, 0, Math.PI * 2)
      context.arc(cx + 30, cy + 12, 16, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = '#94a3b8'
      context.beginPath()
      context.arc(cx - 30, cy + 12, 11, 0, Math.PI * 2)
      context.arc(cx + 30, cy + 12, 11, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = '#0f172a'
      context.beginPath()
      context.arc(cx - 30, cy + 12, 7, 0, Math.PI * 2)
      context.arc(cx + 30, cy + 12, 7, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = '#f87171'
      context.beginPath()
      context.arc(cx - 52, cy + 24, 12, 0, Math.PI * 2)
      context.arc(cx + 52, cy + 24, 12, 0, Math.PI * 2)
      context.fill()

      context.fillStyle = '#ef4444'
      context.beginPath()
      context.arc(cx, cy + 48, 18, 0, Math.PI)
      context.fill()
    },
  })
}

function PandaBillboard({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const texture = usePandaBillboardTexture()

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1.8, 2.4, 0.08]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.7, 2.3]} />
        <meshBasicMaterial map={texture} toneMapped={false} side={DoubleSide} />
      </mesh>
    </group>
  )
}

function NeonPanel({ position, color, text }: { position: [number, number, number]; color: string; text: string }) {
  return (
    <Float speed={2.2} floatIntensity={0.2} rotationIntensity={0.1}>
      <group position={position}>
        <mesh>
          <boxGeometry args={[1.2, 2.4, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.32} emissive={new Color(color).multiplyScalar(0.6)} emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.08, 2.24]} />
          <meshStandardMaterial emissive={color} emissiveIntensity={0.9} color={color} roughness={0.25} metalness={0.1} />
        </mesh>
        <Text color="#f8fafc" fontSize={0.28} position={[0, 0.72, 0.06]} outlineWidth={0.02} outlineColor="#0f172a">
          興
        </Text>
        <Text color="#f8fafc" fontSize={0.18} position={[0, -0.6, 0.06]}>
          {text}
        </Text>
      </group>
    </Float>
  )
}

function ShopAwning({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[2.4, 0.3, 1.1]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.15} />
      </mesh>
      <mesh position={[0, -0.4, 0.2]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[2.4, 0.05, 1.2]} />
        <meshStandardMaterial color={new Color(color).offsetHSL(-0.06, 0.1, -0.1)} roughness={0.55} />
      </mesh>
    </group>
  )
}

function StreetTram() {
  return (
    <group position={[-2.6, 0.18, -1.6]} rotation={[0, Math.PI / 6, 0]}>
      <mesh>
        <boxGeometry args={[3, 1.2, 1.2]} />
        <meshStandardMaterial color="#065f46" roughness={0.55} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[3, 0.5, 1.2]} />
        <meshStandardMaterial color="#eab308" roughness={0.45} metalness={0.28} />
      </mesh>
      <mesh position={[-0.2, -0.6, 0.5]}>
        <boxGeometry args={[2.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#334155" roughness={0.7} metalness={0.1} />
      </mesh>
      <Text color="#f8fafc" fontSize={0.26} position={[1.3, 0.55, 0.62]} rotation={[0, -Math.PI / 2, 0]}>
        Panda Express
      </Text>
    </group>
  )
}

function StreetFurniture() {
  return (
    <group>
      <mesh position={[2.2, 0.1, 1.6]}>
        <boxGeometry args={[1.6, 0.2, 0.4]} />
        <meshStandardMaterial color="#1f2937" roughness={0.6} />
      </mesh>
      <mesh position={[2.2, 0.36, 1.6]}>
        <boxGeometry args={[1.6, 0.12, 0.4]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} />
      </mesh>
      {[1.5, 2.9].map((x) => (
        <mesh key={x} position={[x, 0.7, 1.6]}>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.2} />
        </mesh>
      ))}
      <mesh position={[0.5, 0.1, 2]}>
        <boxGeometry args={[3, 0.2, 0.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      <mesh position={[0.5, 0.3, 2]}>
        <boxGeometry args={[3, 0.16, 0.6]} />
        <meshStandardMaterial color="#22d3ee" roughness={0.4} metalness={0.15} />
      </mesh>
    </group>
  )
}

function BuildingStack() {
  return (
    <group>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4.4, 2, 3.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.15} />
      </mesh>
      <mesh position={[0.6, 2.32, 0]}>
        <boxGeometry args={[3.2, 1.8, 2.6]} />
        <meshStandardMaterial color="#334155" roughness={0.55} />
      </mesh>
      <mesh position={[-1.2, 2.82, 0.1]}>
        <boxGeometry args={[1.4, 1.6, 2]} />
        <meshStandardMaterial color="#2563eb" roughness={0.48} />
      </mesh>
      <mesh position={[0.4, 3.6, 0]}>
        <boxGeometry args={[2.4, 1.4, 2.1]} />
        <meshStandardMaterial color="#64748b" roughness={0.45} metalness={0.2} />
      </mesh>

      <mesh position={[0.4, 4.4, 0]} rotation={[0, 0, Math.PI / 9]}>
        <coneGeometry args={[1.4, 1.2, 4]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.5} metalness={0.1} />
      </mesh>

      <mesh position={[0.08, 0.9, 1.7]}>
        <boxGeometry args={[3.4, 1.1, 0.16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0.08, 0.9, 1.76]}>
        <boxGeometry args={[3.2, 1, 0.1]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.35} metalness={0.18} emissive="#f97316" emissiveIntensity={0.25} />
      </mesh>

      <ShopAwning position={[0.4, 1.5, 1.4]} color="#38bdf8" />
      <ShopAwning position={[-1.4, 1.32, -1.3]} color="#818cf8" />
      <PandaBillboard position={[0.6, 2.6, 1.72]} />
      <PandaBillboard position={[-2.4, 2.2, -0.6]} rotation={[0, Math.PI / 2, 0]} />
      <NeonPanel position={[2.4, 2.6, 1]} color="#22d3ee" text="SUSHI" />
      <NeonPanel position={[2.2, 1.6, -1.4]} color="#f472b6" text="PANDA" />
    </group>
  )
}

function TelephonePoles() {
  return (
    <group>
      {[[-1.6, 0, 1.8], [1.6, 0, -1.8]].map(([x, _, z], index) => (
        <group key={index} position={[x, 0, z]}>
          <mesh position={[0, 2.6, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 5.2, 12]} />
            <meshStandardMaterial color="#4b5563" roughness={0.65} metalness={0.2} />
          </mesh>
          {[1, 2, 3].map((i) => (
            <mesh key={i} position={[0, 1.1 + i * 0.9, 0.02]}>
              <boxGeometry args={[0.5 + i * 0.2, 0.04, 0.06]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export function PandaTown() {
  return (
    <group position={[0, -0.4, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[7, 0.3, 6]} />
        <meshStandardMaterial color="#1f2937" roughness={0.7} metalness={0.15} />
      </mesh>

      <mesh receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[7.2, 0.12, 6.2]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.4} metalness={0.12} />
      </mesh>

      <mesh receiveShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[6.8, 0.1, 5.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>

      <StreetTram />
      <StreetFurniture />
      <TelephonePoles />
      <BuildingStack />
    </group>
  )
}
