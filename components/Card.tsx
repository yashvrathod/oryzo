"use client"

interface CardProps {
  imageSrc: string
  progress: number
  className?: string
}

export default function Card({ imageSrc, progress, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl ${className}`}
      style={{
        opacity: 1,
        transform: `translateY(${(1 - progress) * 40}px)`,
        boxShadow: progress > 0 ? `0 0 40px rgba(0,0,0,0.4)` : 'none',
        transition: progress > 0 && progress < 1 ? 'none' : undefined,
      }}
    >
      <img
        src={imageSrc}
        alt=""
        className="w-full h-full object-cover rounded-2xl"
        style={{ opacity: progress }}
      />
    </div>
  )
}
