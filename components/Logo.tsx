"use client"

export default function Logo() {
  return (
    <div className="absolute top-36 left-12 z-20 select-none">
      <div className="relative">

        {/* Small Heading */}
        <p className="mb-4 ml-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
          Personalized AI guidance for coding interviews.
        </p>

        {/* Glow */}
        <span
          aria-hidden
          className="absolute inset-0 text-[8rem] lg:text-[10rem]
                     font-extrabold tracking-[-0.06em]
                     text-violet-400/20 blur-2xl"
        >
          neXode
        </span>

        {/* Main Logo */}
        <h1
          className="relative text-[8rem] lg:text-[10rem]
                     font-extrabold tracking-[-0.06em]
                     text-white leading-none"
        >
          neXode
        </h1>

      </div>
    </div>
  )
}
