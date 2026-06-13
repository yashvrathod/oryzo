"use client"

export default function Logo() {
  return (
    <div className="absolute z-20 select-none top-6 left-3 sm:top-10 sm:left-6 lg:top-16 lg:left-10 xl:top-24 xl:left-12 2xl:top-32 2xl:left-16">
      <div className="relative">

        {/* Small Heading */}
        <p className="mb-1.5 sm:mb-2 lg:mb-3 ml-0.5 sm:ml-1 text-[9px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-[0.3em] text-[#f5ece0]/80">
          Personalized AI guidance for coding interviews.
        </p>

        {/* Glow */}
        <span
          aria-hidden
          className="absolute inset-0 text-[2.8rem] sm:text-[4.5rem] lg:text-[6.5rem] xl:text-[8.5rem] 2xl:text-[10rem]
                     font-extrabold tracking-[-0.06em]
                     text-violet-400/20 blur-2xl"
        >
          neXode
        </span>

        {/* Main Logo */}
        <h1
          className="relative text-[2.8rem] sm:text-[4.5rem] lg:text-[6.5rem] xl:text-[8.5rem] 2xl:text-[10rem]
                     font-extrabold tracking-[-0.06em]
                     text-[#f5ece0] leading-none"
        >
          neXode
        </h1>

      </div>
    </div>
  )
}
