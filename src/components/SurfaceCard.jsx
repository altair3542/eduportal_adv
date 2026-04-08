import { cn } from '../lib/cn'

function SurfaceCard({ children, className = ''}) {
  return (
    <section
      className={cn (
        'rounded-[28px] border border-white/60 bg-white/70 p-6 shadow-[12px_12px_30px_rgba(148,163,184,0.22), -10_px_-10px_24px_rgba(255,255,255,0.85)] backdrop-blur-xl',
        className
      )}
    >
      {children}
    </section>
  )
}

export default SurfaceCard
