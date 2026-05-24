export function DecorativeFrame() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(21,5,16,0.7)_100%)]" />
      
      {/* Bottom corner accents only - top is handled by header PNG */}
      <div className="absolute bottom-0 left-0 w-24 h-24">
        <div className="absolute bottom-4 left-4 w-12 h-px bg-primary/40" />
        <div className="absolute bottom-4 left-4 w-px h-12 bg-primary/40" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-24 h-24">
        <div className="absolute bottom-4 right-4 w-12 h-px bg-primary/40" />
        <div className="absolute bottom-4 right-4 w-px h-12 bg-primary/40" />
      </div>
    </div>
  )
}
